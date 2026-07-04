import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌿 TropiHair</Text>
        <Text style={styles.tagline}>Smart Scalp & Hair Care</Text>
      </View>

      {/* Health Score Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hair Health Score</Text>
        <Text style={styles.score}>74</Text>
        <Text style={styles.scoreLabel}>/ 100 · Good</Text>
      </View>

      {/* Today's Tasks */}
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>📋 Today's Tasks</Text>
        <Text style={styles.task}>☐ Apply coconut oil</Text>
        <Text style={styles.task}>☐ Scalp massage (10 min)</Text>
        <Text style={styles.taskDone}>☑ Morning hair comb</Text>
      </View>

      {/* Scan Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.scanText}>📸 Scan My Scalp</Text>
      </TouchableOpacity>

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("Routine")}
        >
          <Text style={styles.quickIcon}>📅</Text>
          <Text style={styles.quickText}>Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("Recommendations")}
        >
          <Text style={styles.quickIcon}>💊</Text>
          <Text style={styles.quickText}>Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.quickIcon}>👤</Text>
          <Text style={styles.quickText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  header: { marginBottom: 24 },
  logo: { fontSize: 28, fontWeight: "bold", color: "#52B788" },
  tagline: { fontSize: 14, color: "#A8DADC", marginTop: 4 },
  card: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: { color: "#A8DADC", fontSize: 14, marginBottom: 8 },
  score: { color: "#52B788", fontSize: 64, fontWeight: "bold" },
  scoreLabel: { color: "#A8DADC", fontSize: 14 },
  taskCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  taskTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  task: { color: "#A8DADC", fontSize: 14, marginBottom: 8 },
  taskDone: { color: "#52B788", fontSize: 14, marginBottom: 8 },
  scanButton: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  scanText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  quickLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  quickBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  quickIcon: { fontSize: 24, marginBottom: 6 },
  quickText: { color: "#A8DADC", fontSize: 12 },
});
