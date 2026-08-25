import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { useLanguage } from "../LanguageContext";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { buildPlan } from "../carePlan";

// Same weather setup as Routine. Empty key -> default humidity.
const WEATHER_API_KEY = "";
const CITY = "Negombo,LK";

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const [condition, setCondition] = useState("Normal Healthy");
  const [humidity, setHumidity] = useState(80);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [done, setDone] = useState({});

  useEffect(() => {
    loadTaskData();
  }, []);

  const loadTaskData = async () => {
    const user = auth.currentUser;
    try {
      // Latest scan condition (same source as Routine)
      if (user) {
        const scanQ = query(
          collection(db, "users", user.uid, "scans"),
          orderBy("timestamp", "desc"),
          limit(1),
        );
        const scanSnap = await getDocs(scanQ);
        if (!scanSnap.empty) {
          setCondition(scanSnap.docs[0].data().condition);
        }
      }
      // Weather for climate adjustment
      if (WEATHER_API_KEY) {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${WEATHER_API_KEY}`,
        );
        const data = await res.json();
        setHumidity(data.main.humidity);
      }
    } catch (error) {
      console.log("Home task load error:", error);
    } finally {
      setTasksLoading(false);
    }
  };

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

  // Build the SAME personalized plan as the Routine screen, pick today's day
  const plan = buildPlan(condition, humidity);
  const todayIndex = new Date().getDay() % 7; // 0-6 based on weekday
  const todayPlan = plan[todayIndex];

  const toggleTask = (i) => {
    setDone((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logo}>TropiHair</Text>
          </View>
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
        <Text style={styles.tagline}>{t("tagline")}</Text>
      </View>

      {/* Weather Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Weather")}
      >
        <Text style={styles.cardTitle}>{t("weatherHairCare")}</Text>
        <Text style={styles.score}>32°</Text>
        <Text style={styles.scoreLabel}>{t("tapScalpAdvice")}</Text>
      </TouchableOpacity>

      {/* Today's Tasks - now pulled from the personalized care plan */}
      <View style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{t("todaysTasks")}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Routine")}>
            <Text style={styles.viewAll}>{t("viewPlan")}</Text>
          </TouchableOpacity>
        </View>

        {tasksLoading ? (
          <ActivityIndicator color="#52B788" style={{ marginVertical: 10 }} />
        ) : (
          <>
            <Text style={styles.taskFocus}>
              {todayPlan.focus} · for {condition}
            </Text>
            {todayPlan.tasks.map((task, i) => (
              <TouchableOpacity
                key={i}
                style={styles.taskRow}
                onPress={() => toggleTask(i)}
              >
                <Text style={styles.checkbox}>{done[i] ? "☑" : "☐"}</Text>
                <Text style={[styles.taskText, done[i] && styles.taskDoneText]}>
                  {task}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>

      {/* Scan Button */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.scanText}>{t("scanMyScalp")}</Text>
      </TouchableOpacity>

      {/* Shop Products Button */}
      <TouchableOpacity
        style={styles.shopButton}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.shopText}>{t("shopProducts")}</Text>
      </TouchableOpacity>

      {/* Product Checker Button */}
      <TouchableOpacity
        style={styles.checkerButton}
        onPress={() => navigation.navigate("ProductChecker")}
      >
        <Text style={styles.checkerText}>{t("checkProduct")}</Text>
      </TouchableOpacity>

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("Routine")}
        >
          <Text style={styles.quickIcon}>📅</Text>
          <Text style={styles.quickText}>{t("routine")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("IngredientScanner")}
        >
          <Text style={styles.quickIcon}>💊</Text>
          <Text style={styles.quickText}>{t("tips")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.quickIcon}>👤</Text>
          <Text style={styles.quickText}>{t("profile")}</Text>
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
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoImage: { width: 36, height: 36, resizeMode: "contain" },
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
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  taskTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewAll: { color: "#52B788", fontSize: 13, fontWeight: "600" },
  taskFocus: { color: "#52B788", fontSize: 13, marginBottom: 12 },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkbox: { color: "#52B788", fontSize: 18, marginRight: 12 },
  taskText: { color: "#FFFFFF", fontSize: 14, flex: 1, lineHeight: 20 },
  taskDoneText: { color: "#666", textDecorationLine: "line-through" },
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
    marginBottom: 12,
  },
  shopText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  checkerButton: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#A8DADC",
  },
  checkerText: { color: "#A8DADC", fontSize: 15, fontWeight: "bold" },
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
