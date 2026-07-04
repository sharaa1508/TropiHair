import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function RecommendationsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("oil");

  const oils = [
    {
      name: "Coconut Oil",
      usage: "Apply 2-3 times per week",
      duration: "Leave for 45 minutes",
      benefits: "Antibacterial, moisturizing, reduces inflammation",
      howTo:
        "1. Warm oil slightly\n2. Part hair in sections\n3. Massage into scalp in circular motion\n4. Cover with shower cap\n5. Wash off with mild shampoo",
    },
    {
      name: "Neem Oil",
      usage: "Apply once per week",
      duration: "Leave for 30 minutes",
      benefits: "Antifungal, antibacterial, treats folliculitis",
      howTo:
        "1. Mix with coconut oil (1:3 ratio)\n2. Apply to affected areas\n3. Gentle massage\n4. Wash thoroughly",
    },
    {
      name: "Tea Tree Oil",
      usage: "Apply 2-3 times per week",
      duration: "Leave for 20 minutes",
      benefits: "Antimicrobial, reduces itching, clears pores",
      howTo:
        "1. Dilute with carrier oil\n2. Apply to scalp\n3. Massage gently\n4. Rinse well",
    },
  ];

  const hairPacks = [
    {
      name: "Neem + Turmeric Pack",
      usage: "Once per week",
      duration: "30 minutes",
      benefits: "Fights infection, reduces inflammation",
      howTo:
        "1. Mix neem powder + turmeric + water\n2. Apply to scalp\n3. Leave for 30 mins\n4. Rinse with cool water",
    },
    {
      name: "Aloe Vera + Honey Pack",
      usage: "Twice per week",
      duration: "20 minutes",
      benefits: "Soothes scalp, moisturizes, antibacterial",
      howTo:
        "1. Mix fresh aloe gel + honey\n2. Apply evenly to scalp\n3. Leave for 20 mins\n4. Wash with mild shampoo",
    },
  ];

  const foods = [
    { name: "🥥 Coconut water", benefit: "Hydration + electrolytes" },
    { name: "🐟 Fish (Tuna/Salmon)", benefit: "Omega-3, reduces inflammation" },
    {
      name: "🥬 Gotukola",
      benefit: "Traditional Sri Lankan herb, scalp health",
    },
    { name: "🫚 Sesame seeds", benefit: "Zinc + Vitamin E for hair growth" },
    { name: "🍌 Banana", benefit: "Potassium, strengthens hair" },
  ];

  const data =
    activeTab === "oil" ? oils : activeTab === "pack" ? hairPacks : foods;

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

      <Text style={styles.subtitle}>For: Folliculitis · Moderate</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "oil" && styles.activeTab]}
          onPress={() => setActiveTab("oil")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "oil" && styles.activeTabText,
            ]}
          >
            🫙 Oils
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pack" && styles.activeTab]}
          onPress={() => setActiveTab("pack")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "pack" && styles.activeTabText,
            ]}
          >
            🌿 Hair Packs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "food" && styles.activeTab]}
          onPress={() => setActiveTab("food")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "food" && styles.activeTabText,
            ]}
          >
            🍽️ Foods
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "food" ? (
        <View style={styles.foodCard}>
          <Text style={styles.foodTitle}>
            🇱🇰 Sri Lankan Foods for Scalp Health
          </Text>
          {foods.map((food, index) => (
            <View key={index} style={styles.foodRow}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodBenefit}>{food.benefit}</Text>
            </View>
          ))}
        </View>
      ) : (
        data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardName}>{item.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 Usage:</Text>
              <Text style={styles.infoValue}>{item.usage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⏱️ Duration:</Text>
              <Text style={styles.infoValue}>{item.duration}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>✨ Benefits:</Text>
              <Text style={styles.infoValue}>{item.benefits}</Text>
            </View>
            <View style={styles.howToBox}>
              <Text style={styles.howToTitle}>📋 How to use:</Text>
              <Text style={styles.howToText}>{item.howTo}</Text>
            </View>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.routineBtn}
        onPress={() => navigation.navigate("Routine")}
      >
        <Text style={styles.routineBtnText}>📅 View My Routine Plan</Text>
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
    marginBottom: 8,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  subtitle: {
    color: "#A8DADC",
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
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
  activeTab: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 13 },
  activeTabText: { color: "#FFFFFF", fontWeight: "bold" },
  card: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  infoLabel: { color: "#52B788", fontSize: 13, marginRight: 6 },
  infoValue: { color: "#A8DADC", fontSize: 13, flex: 1 },
  howToBox: {
    backgroundColor: "#0D1B2A",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  howToTitle: {
    color: "#52B788",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  howToText: { color: "#A8DADC", fontSize: 13, lineHeight: 22 },
  foodCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  foodTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
  },
  foodRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
    paddingVertical: 10,
  },
  foodName: { color: "#FFFFFF", fontSize: 14, marginBottom: 4 },
  foodBenefit: { color: "#A8DADC", fontSize: 12 },
  routineBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  routineBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
