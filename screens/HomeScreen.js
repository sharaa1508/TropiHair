import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            const parent = navigation.getParent();
            if (parent) {
              parent.reset({ index: 0, routes: [{ name: "Login" }] });
            } else {
              navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            }
          } catch (error) {
            console.log("Logout error:", error);
            Alert.alert("Error", "Could not logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.logo}>🌿 TropiHair</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={handleLogout}>
              <Text style={styles.bellIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.tagline}>Smart Scalp & Hair Care</Text>
      </View>

      {/* Weather Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Weather")}
      >
        <Text style={styles.cardTitle}>🌡️ Weather & Hair Care</Text>
        <Text style={styles.score}>32°</Text>
        <Text style={styles.scoreLabel}>Tap to see scalp advice</Text>
      </TouchableOpacity>

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

      {/* Shop Products Button */}
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.shopText}>🛒 Shop Hair Care Products</Text>
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
          onPress={() => navigation.navigate("IngredientScanner")}
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontSize: 28, fontWeight: "bold", color: "#52B788" },
  headerIcons: { flexDirection: "row", gap: 8 },
  iconBtn: { backgroundColor: "#1B2A3B", borderRadius: 12, padding: 8 },
  bellIcon: { fontSize: 20 },
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
    marginBottom: 12,
  },
  scanText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  shopButton: {
    backgroundColor: "#F4A261",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  shopText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
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
