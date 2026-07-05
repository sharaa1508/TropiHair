import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

export default function IngredientScannerScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("scanner");
  const [searchText, setSearchText] = useState("");
  const [scannedIngredients, setScannedIngredients] = useState([]);

  // Harmful/Safe ingredient database
  const ingredientDatabase = {
    // Harmful
    sulfate: {
      status: "harmful",
      reason: "Strips natural oils, causes dryness",
      level: "high",
    },
    "sodium lauryl sulfate": {
      status: "harmful",
      reason: "Very harsh, damages hair follicles",
      level: "high",
    },
    "sodium laureth sulfate": {
      status: "harmful",
      reason: "Strips moisture, causes frizz",
      level: "high",
    },
    paraben: {
      status: "harmful",
      reason: "Hormone disruptor, linked to hair loss",
      level: "high",
    },
    methylparaben: {
      status: "harmful",
      reason: "Hormone disruptor",
      level: "high",
    },
    propylparaben: {
      status: "harmful",
      reason: "Hormone disruptor",
      level: "high",
    },
    formaldehyde: {
      status: "harmful",
      reason: "Toxic, causes scalp irritation",
      level: "high",
    },
    "alcohol denat": {
      status: "harmful",
      reason: "Drying alcohol, strips moisture",
      level: "medium",
    },
    "isopropyl alcohol": {
      status: "harmful",
      reason: "Drying, causes breakage",
      level: "medium",
    },
    silicone: {
      status: "caution",
      reason: "Builds up over time, blocks scalp",
      level: "low",
    },
    dimethicone: {
      status: "caution",
      reason: "Heavy buildup, may block follicles",
      level: "low",
    },
    fragrance: {
      status: "caution",
      reason: "May cause scalp irritation",
      level: "low",
    },
    "mineral oil": {
      status: "caution",
      reason: "Clogs pores, prevents moisture",
      level: "medium",
    },
    // Safe
    "coconut oil": {
      status: "safe",
      reason: "Deeply moisturizing, antibacterial",
      level: "safe",
    },
    "argan oil": {
      status: "safe",
      reason: "Rich in Vitamin E, reduces frizz",
      level: "safe",
    },
    "aloe vera": {
      status: "safe",
      reason: "Soothes scalp, promotes growth",
      level: "safe",
    },
    keratin: {
      status: "safe",
      reason: "Strengthens hair structure",
      level: "safe",
    },
    biotin: { status: "safe", reason: "Promotes hair growth", level: "safe" },
    niacinamide: {
      status: "safe",
      reason: "Improves scalp circulation",
      level: "safe",
    },
    "tea tree oil": {
      status: "safe",
      reason: "Antifungal, treats dandruff",
      level: "safe",
    },
    glycerin: {
      status: "safe",
      reason: "Humectant, retains moisture",
      level: "safe",
    },
    panthenol: {
      status: "safe",
      reason: "Vitamin B5, strengthens hair",
      level: "safe",
    },
    neem: {
      status: "safe",
      reason: "Antibacterial, treats scalp issues",
      level: "safe",
    },
  };

  const checkIngredient = (ingredient) => {
    const lower = ingredient.toLowerCase().trim();
    for (const [key, value] of Object.entries(ingredientDatabase)) {
      if (lower.includes(key)) {
        return { name: ingredient, ...value };
      }
    }
    return {
      name: ingredient,
      status: "unknown",
      reason: "Not in our database",
      level: "unknown",
    };
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const ingredients = searchText
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    const results = ingredients.map(checkIngredient);
    setScannedIngredients(results);
  };

  const getStatusColor = (status) => {
    if (status === "safe") return "#52B788";
    if (status === "harmful") return "#E63946";
    if (status === "caution") return "#F4A261";
    return "#666";
  };

  const getStatusEmoji = (status) => {
    if (status === "safe") return "✅";
    if (status === "harmful") return "❌";
    if (status === "caution") return "⚠️";
    return "❓";
  };

  const safeCount = scannedIngredients.filter(
    (i) => i.status === "safe",
  ).length;
  const harmfulCount = scannedIngredients.filter(
    (i) => i.status === "harmful",
  ).length;
  const cautionCount = scannedIngredients.filter(
    (i) => i.status === "caution",
  ).length;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ingredient Scanner</Text>
        <View />
      </View>

      <Text style={styles.subtitle}>
        Check if your shampoo ingredients are safe for your scalp
      </Text>

      {/* Tab Toggle */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "scanner" && styles.tabActive]}
          onPress={() => setActiveTab("scanner")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "scanner" && styles.tabTextActive,
            ]}
          >
            🔍 Check Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "guide" && styles.tabActive]}
          onPress={() => setActiveTab("guide")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "guide" && styles.tabTextActive,
            ]}
          >
            📚 Ingredient Guide
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "scanner" ? (
        <View>
          {/* Scanner Card */}
          <View style={styles.scanCard}>
            <Text style={styles.scanTitle}>📝 Enter Ingredients</Text>
            <Text style={styles.scanHint}>
              Copy ingredients from your shampoo label and paste below. Separate
              each ingredient with a comma.
            </Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={5}
              placeholder="e.g. Sodium Lauryl Sulfate, Coconut Oil, Glycerin, Paraben..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.checkBtn} onPress={handleSearch}>
              <Text style={styles.checkBtnText}>🔍 Analyze Ingredients</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          {scannedIngredients.length > 0 && (
            <View>
              {/* Summary */}
              <View style={styles.summaryRow}>
                <View style={[styles.summaryBox, { borderColor: "#52B788" }]}>
                  <Text style={styles.summaryNum}>{safeCount}</Text>
                  <Text style={styles.summaryLabel}>✅ Safe</Text>
                </View>
                <View style={[styles.summaryBox, { borderColor: "#F4A261" }]}>
                  <Text style={styles.summaryNum}>{cautionCount}</Text>
                  <Text style={styles.summaryLabel}>⚠️ Caution</Text>
                </View>
                <View style={[styles.summaryBox, { borderColor: "#E63946" }]}>
                  <Text style={styles.summaryNum}>{harmfulCount}</Text>
                  <Text style={styles.summaryLabel}>❌ Harmful</Text>
                </View>
              </View>

              {/* Overall Rating */}
              <View
                style={[
                  styles.ratingCard,
                  {
                    borderColor:
                      harmfulCount > 2
                        ? "#E63946"
                        : harmfulCount > 0
                          ? "#F4A261"
                          : "#52B788",
                  },
                ]}
              >
                <Text style={styles.ratingEmoji}>
                  {harmfulCount > 2 ? "🔴" : harmfulCount > 0 ? "🟡" : "🟢"}
                </Text>
                <Text
                  style={[
                    styles.ratingText,
                    {
                      color:
                        harmfulCount > 2
                          ? "#E63946"
                          : harmfulCount > 0
                            ? "#F4A261"
                            : "#52B788",
                    },
                  ]}
                >
                  {harmfulCount > 2
                    ? "Not Recommended"
                    : harmfulCount > 0
                      ? "Use with Caution"
                      : "Safe to Use"}
                </Text>
              </View>

              {/* Ingredient Results */}
              {scannedIngredients.map((item, index) => (
                <View key={index} style={styles.ingredientCard}>
                  <View style={styles.ingredientHeader}>
                    <Text style={styles.ingredientEmoji}>
                      {getStatusEmoji(item.status)}
                    </Text>
                    <Text style={styles.ingredientName}>{item.name}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(item.status) + "33",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(item.status) },
                        ]}
                      >
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.ingredientReason}>{item.reason}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        // Guide Tab
        <View>
          <View style={styles.guideSection}>
            <Text style={styles.guideSectionTitle}>
              ❌ Harmful Ingredients to Avoid
            </Text>
            {[
              {
                name: "Sulfates (SLS/SLES)",
                desc: "Strip natural oils, cause dryness and breakage",
              },
              {
                name: "Parabens",
                desc: "Hormone disruptors, linked to hair thinning",
              },
              {
                name: "Formaldehyde",
                desc: "Toxic chemical, causes scalp irritation",
              },
              {
                name: "Drying Alcohols",
                desc: "Strip moisture, cause frizz and breakage",
              },
              {
                name: "Mineral Oil",
                desc: "Clogs scalp pores, prevents nutrient absorption",
              },
            ].map((item, index) => (
              <View key={index} style={styles.guideItem}>
                <View
                  style={[styles.guideDot, { backgroundColor: "#E63946" }]}
                />
                <View style={styles.guideContent}>
                  <Text style={styles.guideName}>{item.name}</Text>
                  <Text style={styles.guideDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.guideSection}>
            <Text style={styles.guideSectionTitle}>
              ✅ Safe Ingredients to Look For
            </Text>
            {[
              {
                name: "Coconut Oil",
                desc: "Deep moisturizing, antibacterial properties",
              },
              {
                name: "Aloe Vera",
                desc: "Soothes scalp, promotes healthy growth",
              },
              {
                name: "Tea Tree Oil",
                desc: "Antifungal, treats dandruff effectively",
              },
              { name: "Biotin", desc: "Vitamin B7, promotes hair growth" },
              { name: "Glycerin", desc: "Humectant, locks in moisture" },
              {
                name: "Neem Extract",
                desc: "Antibacterial, treats scalp infections",
              },
            ].map((item, index) => (
              <View key={index} style={styles.guideItem}>
                <View
                  style={[styles.guideDot, { backgroundColor: "#52B788" }]}
                />
                <View style={styles.guideContent}>
                  <Text style={styles.guideName}>{item.name}</Text>
                  <Text style={styles.guideDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
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
    marginBottom: 8,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  subtitle: {
    color: "#A8DADC",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 12 },
  tabTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  scanCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  scanTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  scanHint: {
    color: "#A8DADC",
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 18,
  },
  textArea: {
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 14,
    color: "#FFFFFF",
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#2A3F52",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  checkBtn: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  checkBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  summaryNum: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  summaryLabel: { color: "#A8DADC", fontSize: 11, marginTop: 4 },
  ratingCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    gap: 12,
  },
  ratingEmoji: { fontSize: 32 },
  ratingText: { fontSize: 18, fontWeight: "bold" },
  ingredientCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  ingredientHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  ingredientEmoji: { fontSize: 18 },
  ingredientName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: { fontSize: 10, fontWeight: "bold" },
  ingredientReason: { color: "#A8DADC", fontSize: 12, lineHeight: 18 },
  guideSection: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  guideSectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 14,
  },
  guideItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  guideDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
    marginTop: 4,
  },
  guideContent: { flex: 1 },
  guideName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  guideDesc: { color: "#A8DADC", fontSize: 12, lineHeight: 18 },
});
