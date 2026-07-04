import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ResultsScreen({ navigation }) {
  // Mock data — later AI model result connect pannuvom
  const result = {
    condition: "Folliculitis",
    severity: "Moderate",
    confidence: 87,
    description:
      "Folliculitis is an infection of the hair follicles, commonly caused by bacteria. It appears as small red bumps or pimples around hair follicles.",
    severityColor: "#F4A261",
  };

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

      {/* Result Card */}
      <View style={styles.resultCard}>
        <Text style={styles.conditionLabel}>Detected Condition</Text>
        <Text style={styles.conditionName}>{result.condition}</Text>

        {/* Severity Badge */}
        <View
          style={[
            styles.severityBadge,
            { backgroundColor: result.severityColor },
          ]}
        >
          <Text style={styles.severityText}>{result.severity}</Text>
        </View>

        {/* Confidence */}
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

      {/* Severity Levels */}
      <View style={styles.severityCard}>
        <Text style={styles.severityTitle}>📊 Severity Levels</Text>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#52B788" }]} />
          <Text style={styles.severityLabel}>
            Mild — Early stage, manageable at home
          </Text>
        </View>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#F4A261" }]} />
          <Text style={styles.severityLabel}>
            Moderate — Treatment recommended
          </Text>
        </View>
        <View style={styles.severityRow}>
          <View style={[styles.severityDot, { backgroundColor: "#E63946" }]} />
          <Text style={styles.severityLabel}>
            Severe — See a doctor immediately
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("Recommendations")}
      >
        <Text style={styles.primaryBtnText}>💊 View Recommendations</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate("Home")}
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
  progressFill: {
    height: "100%",
    backgroundColor: "#52B788",
    borderRadius: 4,
  },
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
  severityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  severityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
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
