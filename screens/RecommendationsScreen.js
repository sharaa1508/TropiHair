import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getRecommendation } from "../recommendations";

export default function RecommendationsScreen({ navigation, route }) {
  // Condition comes from Results screen; fallback to a demo condition
  const condition = route?.params?.condition || "Normal Healthy";
  const rec = getRecommendation(condition);

  const [activeTab, setActiveTab] = useState("oils");

  const tabs = [
    { key: "oils", label: "🧴 Oils" },
    { key: "packs", label: "🌿 Hair Packs" },
    { key: "foods", label: "🍛 Foods" },
    { key: "care", label: "💡 Care" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Recommendations</Text>
        <View />
      </View>

      {/* Condition banner */}
      <View style={styles.conditionCard}>
        <Text style={styles.conditionLabel}>For your condition</Text>
        <Text style={styles.conditionName}>{condition}</Text>
        <Text style={styles.conditionSummary}>{rec.summary}</Text>
      </View>

      {/* Doctor alert (only for conditions that need it) */}
      {rec.seeDoctor && rec.doctorNote ? (
        <View style={styles.doctorCard}>
          <Text style={styles.doctorIcon}>⚕️</Text>
          <Text style={styles.doctorText}>{rec.doctorNote}</Text>
        </View>
      ) : null}

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---- OILS ---- */}
      {activeTab === "oils" &&
        (rec.oils.length ? (
          rec.oils.map((oil, i) => (
            <View key={i} style={styles.itemCard}>
              <Text style={styles.itemTitle}>
                {oil.emoji} {oil.name}
              </Text>
              <Text style={styles.itemLine}>
                <Text style={styles.itemLabel}>How: </Text>
                {oil.usage}
              </Text>
              <Text style={styles.itemLine}>
                <Text style={styles.itemLabel}>Duration: </Text>
                {oil.duration}
              </Text>
              <Text style={styles.itemBenefit}>✓ {oil.benefit}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No specific oils for this condition.
          </Text>
        ))}

      {/* ---- HAIR PACKS ---- */}
      {activeTab === "packs" &&
        (rec.hairPacks.length ? (
          rec.hairPacks.map((pack, i) => (
            <View key={i} style={styles.itemCard}>
              <Text style={styles.itemTitle}>
                {pack.emoji} {pack.name}
              </Text>
              <Text style={styles.itemLine}>
                <Text style={styles.itemLabel}>Recipe: </Text>
                {pack.recipe}
              </Text>
              <Text style={styles.itemLine}>
                <Text style={styles.itemLabel}>Duration: </Text>
                {pack.duration}
              </Text>
              <Text style={styles.itemBenefit}>✓ {pack.benefit}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No specific hair packs for this condition.
          </Text>
        ))}

      {/* ---- FOODS ---- */}
      {activeTab === "foods" && (
        <View>
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>🍛 Eat more of these</Text>
            {rec.foods.map((food, i) => (
              <View key={i} style={styles.foodRow}>
                <Text style={styles.foodName}>
                  {food.emoji} {food.name}
                </Text>
                <Text style={styles.foodWhy}>{food.why}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* ---- CARE (tips + avoid) ---- */}
      {activeTab === "care" && (
        <View>
          {rec.careTips.length ? (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>✅ Care Tips</Text>
              {rec.careTips.map((tip, i) => (
                <Text key={i} style={styles.bullet}>
                  • {tip}
                </Text>
              ))}
            </View>
          ) : null}

          {rec.avoid.length ? (
            <View style={[styles.itemCard, styles.avoidCard]}>
              <Text style={styles.avoidTitle}>⚠️ Things to Avoid</Text>
              {rec.avoid.map((item, i) => (
                <Text key={i} style={styles.avoidBullet}>
                  ✕ {item}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      )}

      {/* Routine button */}
      <TouchableOpacity
        style={styles.routineBtn}
        onPress={() => navigation.navigate("Main", { screen: "Routine" })}
      >
        <Text style={styles.routineBtnText}>📅 Create My Routine</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        * These are supportive care suggestions, not medical treatment. Always
        consult a dermatologist for diagnosis and treatment.
      </Text>
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
    marginBottom: 20,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  conditionCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  conditionLabel: { color: "#A8DADC", fontSize: 12, marginBottom: 4 },
  conditionName: {
    color: "#52B788",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  conditionSummary: { color: "#A8DADC", fontSize: 13, lineHeight: 19 },
  doctorCard: {
    backgroundColor: "#3A2A1B",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F4A261",
  },
  doctorIcon: { fontSize: 20, marginRight: 10 },
  doctorText: { color: "#F4C89B", fontSize: 13, flex: 1, lineHeight: 19 },
  tabRow: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  tabActive: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 11, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  itemCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  itemTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemLine: { color: "#A8DADC", fontSize: 13, marginBottom: 5, lineHeight: 19 },
  itemLabel: { color: "#52B788", fontWeight: "bold" },
  itemBenefit: {
    color: "#52B788",
    fontSize: 13,
    marginTop: 4,
    fontStyle: "italic",
  },
  foodRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
    paddingVertical: 10,
  },
  foodName: { color: "#FFFFFF", fontSize: 14, marginBottom: 2 },
  foodWhy: { color: "#A8DADC", fontSize: 12 },
  bullet: { color: "#A8DADC", fontSize: 13, marginBottom: 8, lineHeight: 19 },
  avoidCard: { borderWidth: 1, borderColor: "#E63946" },
  avoidTitle: {
    color: "#E63946",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avoidBullet: {
    color: "#F4A8AD",
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 19,
  },
  emptyText: {
    color: "#A8DADC",
    fontSize: 13,
    textAlign: "center",
    padding: 20,
  },
  routineBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  routineBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  disclaimer: {
    color: "#666",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 16,
  },
});
