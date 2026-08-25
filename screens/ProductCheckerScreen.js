import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// Same working Gemini setup as the chatbot
const GEMINI_API_KEY = "AQ.Ab8RN6IpLwHmYve7HLHK1cvWpCfHQ6bppUp2VTQ2xUvuHvxGRw";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

export default function ProductCheckerScreen({ navigation }) {
  const [condition, setCondition] = useState("Normal Healthy");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadCondition();
  }, []);

  const loadCondition = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const q = query(
        collection(db, "users", user.uid, "scans"),
        orderBy("timestamp", "desc"),
        limit(1),
      );
      const snap = await getDocs(q);
      if (!snap.empty) setCondition(snap.docs[0].data().condition);
    } catch (e) {
      console.log("Condition load error:", e);
    }
  };

  const analyze = async () => {
    const productText = input.trim();
    if (!productText || loading) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const prompt = `You are a hair-care product analyst for a Sri Lankan scalp-health app.
The climate is tropical: hot and very humid.
The user's current scalp condition is: ${condition}.
Analyze this product for that user: "${productText}".

Base your judgement on the typical ingredients of that product or product type.
Respond with ONLY valid JSON (no markdown, no backticks, no extra text) in exactly this shape:
{
  "verdict": "Good" | "Caution" | "Avoid",
  "summary": "one short sentence for this user",
  "good": ["short point", "short point"],
  "avoid": ["short point", "short point"],
  "climate": "one sentence on suitability for hot, humid Sri Lankan weather"
}
Keep each list point under 12 words. If unfamiliar with the product, give general guidance for its product type.`;

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        console.log(
          "Product checker API error:",
          response.status,
          JSON.stringify(data),
        );
      }

      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      // Strip any code fences just in case
      text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(text);
      setResult(parsed);
    } catch (e) {
      console.log("Product checker error:", e);
      setError("Could not analyze. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const verdictColor = (v) => {
    if (v === "Good") return "#52B788";
    if (v === "Avoid") return "#E63946";
    return "#F4A261"; // Caution / anything else
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Product Checker</Text>
        <View />
      </View>

      <Text style={styles.subtitle}>
        Check if any hair-care product suits your scalp ({condition}) and Sri
        Lanka's humid climate.
      </Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="e.g. Head & Shoulders shampoo, or paste ingredients..."
        placeholderTextColor="#666"
        value={input}
        onChangeText={setInput}
        multiline
      />

      <TouchableOpacity
        style={styles.analyzeBtn}
        onPress={analyze}
        disabled={loading}
      >
        <Text style={styles.analyzeBtnText}>
          {loading ? "Analyzing..." : "🔍 Analyze Product"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          color="#52B788"
          size="large"
          style={{ marginTop: 24 }}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <View
            style={[
              styles.verdictBadge,
              { backgroundColor: verdictColor(result.verdict) },
            ]}
          >
            <Text style={styles.verdictText}>
              {result.verdict === "Good"
                ? "✓ "
                : result.verdict === "Avoid"
                  ? "✕ "
                  : "! "}
              {result.verdict}
            </Text>
          </View>

          {!!result.summary && (
            <Text style={styles.summaryText}>{result.summary}</Text>
          )}

          {Array.isArray(result.good) && result.good.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👍 Good for you</Text>
              {result.good.map((g, i) => (
                <Text key={i} style={styles.goodPoint}>
                  ✓ {g}
                </Text>
              ))}
            </View>
          )}

          {Array.isArray(result.avoid) && result.avoid.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👎 Watch out</Text>
              {result.avoid.map((a, i) => (
                <Text key={i} style={styles.badPoint}>
                  ✕ {a}
                </Text>
              ))}
            </View>
          )}

          {!!result.climate && (
            <View style={styles.climateBox}>
              <Text style={styles.climateText}>🌴 {result.climate}</Text>
            </View>
          )}

          <Text style={styles.disclaimer}>
            AI guidance only — consult a dermatologist for medical advice.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  subtitle: {
    color: "#A8DADC",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1B2A3B",
    borderRadius: 14,
    padding: 14,
    color: "#FFFFFF",
    fontSize: 14,
    minHeight: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#2A3F52",
  },
  analyzeBtn: {
    backgroundColor: "#52B788",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  analyzeBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  errorText: {
    color: "#E63946",
    fontSize: 13,
    marginTop: 16,
    textAlign: "center",
  },
  resultCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },
  verdictBadge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 12,
  },
  verdictText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  summaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  section: { marginTop: 12 },
  sectionTitle: {
    color: "#A8DADC",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  goodPoint: {
    color: "#52B788",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  badPoint: { color: "#E9A0A6", fontSize: 13, lineHeight: 20, marginBottom: 4 },
  climateBox: {
    backgroundColor: "#152030",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  climateText: { color: "#A8DADC", fontSize: 13, lineHeight: 19 },
  disclaimer: {
    color: "#666",
    fontSize: 11,
    marginTop: 14,
    fontStyle: "italic",
  },
});
