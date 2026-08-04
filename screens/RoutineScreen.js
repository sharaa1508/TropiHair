import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ResultsScreen({ navigation, route }) {
  const apiResult = route?.params?.result;
  const imageUri = route?.params?.imageUri;
  const [showHeatmap, setShowHeatmap] = useState(false);

  const getSeverity = (confidence) => {
    if (confidence >= 85) return { label: "High Confidence", color: "#52B788" };
    if (confidence >= 70) return { label: "Moderate", color: "#F4A261" };
    return { label: "Low Confidence", color: "#E63946" };
  };

  const result = apiResult
    ? {
        condition: apiResult.condition,
        confidence: apiResult.confidence,
        description: apiResult.description,
        top3: apiResult.top3 || [],
        heatmap: apiResult.heatmap || null,
        ...getSeverity(apiResult.confidence),
      }
    : {
        condition: "No Scan Yet",
        confidence: 0,
        description: "Please scan your scalp first to see results.",
        top3: [],
        heatmap: null,
        label: "N/A",
        color: "#A8DADC",
      };

  // Save scan to Firestore history
  useEffect(() => {
    const saveScan = async () => {
      const user = auth.currentUser;
      if (!user || !apiResult) return;
      try {
        await addDoc(collection(db, "users", user.uid, "scans"), {
          condition: apiResult.condition,
          confidence: apiResult.confidence,
          description: apiResult.description || "",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.log("Scan save error:", error);
      }
    };
    saveScan();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Analysis Results</Text>
        <View />
      </View>

      {/* Image (original OR heatmap) */}
      {imageUri && (
        <View style={styles.imageBox}>
          {showHeatmap && result.heatmap ? (
            <Image
              source={{ uri: `data:image/png;base64,${result.heatmap}` }}
              style={styles.scanImage}
            />
          ) : (
            <Image source={{ uri: imageUri }} style={styles.scanImage} />
          )}
        </View>
      )}

      {/* Heatmap toggle (only if heatmap exists) */}
      {result.heatmap && (
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, !showHeatmap && styles.toggleActive]}
            onPress={() => setShowHeatmap(false)}
          >
            <Text
              style={[
                styles.toggleText,
                !showHeatmap && styles.toggleTextActive,
              ]}
            >
              📷 Original
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, showHeatmap && styles.toggleActive]}
            onPress={() => setShowHeatmap(true)}
          >
            <Text
              style={[
                styles.toggleText,
                showHeatmap && styles.toggleTextActive,
              ]}
            >
              🔬 AI View
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* AI View explanation */}
      {showHeatmap && result.heatmap && (
        <View style={styles.heatmapInfo}>
          <Text style={styles.heatmapInfoText}>
            🔬 The highlighted areas show where the AI focused to make this
            prediction. Red/yellow zones influenced the result most.
          </Text>
        </View>
      )}

      {/* Result Card */}
      <View style={styles.resultCard}>
        <Text style={styles.conditionLabel}>Detected Condition</Text>
        <Text style={styles.conditionName}>{result.condition}</Text>

        <View style={[styles.severityBadge, { backgroundColor: result.color }]}>
          <Text style={styles.severityText}>{result.label}</Text>
        </View>

        <Text style={styles.confidence}>
          AI Confidence: {result.confidence}%
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${result.confidence}%` }]}
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.descCard}>
        <Text style={styles.descTitle}>📋 About this condition</Text>
        <Text style={styles.descText}>{result.description}</Text>
      </View>

      {/* Other Possibilities */}
      {result.top3.length > 1 && (
        <View style={styles.top3Card}>
          <Text style={styles.top3Title}>🔍 Other Possibilities</Text>
          {result.top3.map((item, index) => (
            <View key={index} style={styles.top3Row}>
              <Text style={styles.top3Condition}>{item.condition}</Text>
              <Text style={styles.top3Confidence}>{item.confidence}%</Text>
            </View>
          ))}
        </View>
      )}

      {/* Confidence Guide */}
      <View style={styles.severityCard}>
        <Text style={styles.severityTitle}>📊 Confidence Guide</Text>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#52B788" }]} />
          <Text style={styles.severityLabel}>High (85%+) — Strong match</Text>
        </View>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#F4A261" }]} />
          <Text style={styles.severityLabel}>
            Moderate (70-85%) — Likely match
          </Text>
        </View>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#E63946" }]} />
          <Text style={styles.severityLabel}>Low — Consider rescanning</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() =>
          navigation.navigate("Recommendations", {
            condition: result.condition,
          })
        }
      >
        <Text style={styles.primaryBtnText}>💊 View Recommendations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate("Main", { screen: "Home" })}
      >
        <Text style={styles.secondaryBtnText}>🏠 Back to Home</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  imageBox: {
    borderRadius: 16,
    height: 180,
    overflow: "hidden",
    marginBottom: 12,
  },
  scanImage: { width: "100%", height: "100%" },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleActive: { backgroundColor: "#52B788" },
  toggleText: { color: "#A8DADC", fontSize: 13, fontWeight: "600" },
  toggleTextActive: { color: "#FFFFFF" },
  heatmapInfo: {
    backgroundColor: "#152030",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  heatmapInfoText: { color: "#A8DADC", fontSize: 12, lineHeight: 18 },
  resultCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  conditionLabel: { color: "#A8DADC", fontSize: 13, marginBottom: 8 },
  conditionName: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  severityBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  severityText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  confidence: { color: "#A8DADC", fontSize: 13, marginBottom: 8 },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#0D1B2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#52B788", borderRadius: 4 },
  descCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  descTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descText: { color: "#A8DADC", fontSize: 13, lineHeight: 20 },
  top3Card: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  top3Title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  top3Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  top3Condition: { color: "#A8DADC", fontSize: 14 },
  top3Confidence: { color: "#52B788", fontSize: 14, fontWeight: "bold" },
  severityCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  severityTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  severityRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  severityDot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  severityLabel: { color: "#A8DADC", fontSize: 13 },
  primaryBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  secondaryBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  secondaryBtnText: { color: "#52B788", fontSize: 16, fontWeight: "bold" },
});
