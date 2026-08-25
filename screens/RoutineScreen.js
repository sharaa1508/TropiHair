import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { buildPlan } from "../carePlan";

// Weather (same key as WeatherScreen). Empty -> mock.
const WEATHER_API_KEY = "";
const CITY = "Negombo,LK";

export default function RoutineScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState("Normal Healthy");
  const [hairType, setHairType] = useState("Normal");
  const [humidity, setHumidity] = useState(80);
  const [selectedDay, setSelectedDay] = useState(0);
  const [done, setDone] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = auth.currentUser;
    try {
      if (user) {
        // Latest scan condition
        const scanQ = query(
          collection(db, "users", user.uid, "scans"),
          orderBy("timestamp", "desc"),
          limit(1),
        );
        const scanSnap = await getDocs(scanQ);
        if (!scanSnap.empty) {
          setCondition(scanSnap.docs[0].data().condition);
        }
        // Hair type from profile
        const profileSnap = await getDoc(doc(db, "users", user.uid));
        if (profileSnap.exists() && profileSnap.data().hairType) {
          setHairType(profileSnap.data().hairType);
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
      console.log("Routine load error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#52B788" />
      </View>
    );
  }

  // Shared builder - same plan Home screen uses
  const plan = buildPlan(condition, humidity);
  const today = plan[selectedDay];

  const toggleTask = (dayIdx, taskIdx) => {
    const key = `${dayIdx}-${taskIdx}`;
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Care Plan</Text>
      <Text style={styles.subtitle}>
        Personalized for {condition} · {hairType} hair
      </Text>

      {/* Why this plan */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          🌿 This 7-day plan adapts to your latest scan ({condition}), your hair
          type ({hairType}), and today's humidity ({humidity}%).
        </Text>
      </View>

      {/* Day selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dayRow}
      >
        {plan.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dayBtn, selectedDay === i && styles.dayActive]}
            onPress={() => setSelectedDay(i)}
          >
            <Text
              style={[
                styles.dayBtnText,
                selectedDay === i && styles.dayBtnTextActive,
              ]}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected day plan */}
      <View style={styles.planCard}>
        <Text style={styles.focusLabel}>Focus</Text>
        <Text style={styles.focusText}>{today.focus}</Text>

        <View style={styles.divider} />

        {today.tasks.map((task, i) => {
          const key = `${selectedDay}-${i}`;
          const isDone = done[key];
          return (
            <TouchableOpacity
              key={i}
              style={styles.taskRow}
              onPress={() => toggleTask(selectedDay, i)}
            >
              <Text style={styles.checkbox}>{isDone ? "☑" : "☐"}</Text>
              <Text style={[styles.taskText, isDone && styles.taskDone]}>
                {task}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Actions */}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.actionBtnText}>📸 Do Today's Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtnOutline}
        onPress={() => navigation.navigate("FlareForecast")}
      >
        <Text style={styles.actionBtnOutlineText}>
          🌦️ 7-Day Flare-Up Forecast
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtnOutline}
        onPress={() => navigation.navigate("Weather")}
      >
        <Text style={styles.actionBtnOutlineText}>🌴 Check Today's MSHI</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
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
  center: { justifyContent: "center", alignItems: "center" },
  title: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#52B788", fontSize: 14, marginTop: 4, marginBottom: 16 },
  infoCard: {
    backgroundColor: "#152030",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  infoText: { color: "#A8DADC", fontSize: 13, lineHeight: 19 },
  dayRow: { marginBottom: 16 },
  dayBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    height: 42,
  },
  dayActive: { backgroundColor: "#52B788" },
  dayBtnText: { color: "#A8DADC", fontSize: 13, fontWeight: "600" },
  dayBtnTextActive: { color: "#FFFFFF" },
  planCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  focusLabel: { color: "#A8DADC", fontSize: 12 },
  focusText: {
    color: "#52B788",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
  },
  divider: { height: 1, backgroundColor: "#0D1B2A", marginVertical: 16 },
  taskRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 14 },
  checkbox: { color: "#52B788", fontSize: 18, marginRight: 12 },
  taskText: { color: "#FFFFFF", fontSize: 14, flex: 1, lineHeight: 20 },
  taskDone: { color: "#666", textDecorationLine: "line-through" },
  actionBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  actionBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  actionBtnOutline: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#52B788",
    marginBottom: 12,
  },
  actionBtnOutlineText: { color: "#52B788", fontSize: 16, fontWeight: "bold" },
});
