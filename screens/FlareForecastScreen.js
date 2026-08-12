import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

// Paste your OpenWeatherMap key for LIVE forecast. Empty string -> demo data.
const WEATHER_API_KEY = "e2c3def2faecbb2cb68da8c30e02cc50";
const CITY = "Negombo,LK";

// How strongly each condition reacts to tropical weather.
// 1.0 = highly weather-driven (fungal), lower = more stable regardless of weather.
const CONDITION_WEIGHT = {
  Folliculitis: 1.0,
  "Seborrheic Dermatitis": 1.0,
  "Tinea Capitis": 1.0,
  Psoriasis: 0.6,
  "Telogen Effluvium": 0.4,
  "Alopecia Areata": 0.4,
  "Male Pattern Baldness": 0.35,
  "Head Lice": 0.3,
  "Normal Healthy": 0.25,
  "Not Scalp": 0.2,
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Core risk model: humidity + heat + rain, scaled by how weather-sensitive the condition is.
function riskForDay(condition, humidity, temp, rainMm) {
  const weight = CONDITION_WEIGHT[condition] ?? 0.5;
  const humidityFactor = clamp((humidity - 60) / 40, 0, 1); // 60% -> 0, 100% -> 1
  const heatFactor = clamp((temp - 24) / 12, 0, 1); // 24C -> 0, 36C -> 1
  const rainFactor = clamp(rainMm / 10, 0, 1); // 10mm+ -> 1
  const raw = 0.5 * humidityFactor + 0.3 * heatFactor + 0.2 * rainFactor;
  return Math.round(weight * raw * 100);
}

function riskLabel(score) {
  if (score >= 66) return { label: "High", color: "#E63946" };
  if (score >= 33) return { label: "Moderate", color: "#F4A261" };
  return { label: "Low", color: "#52B788" };
}

function adviceFor(condition, score) {
  const fungal = [
    "Folliculitis",
    "Seborrheic Dermatitis",
    "Tinea Capitis",
  ].includes(condition);
  if (score >= 66) {
    return fungal
      ? "High flare risk — keep scalp dry, anti-fungal wash, don't cover damp hair."
      : "High risk — gentle care, avoid sweat build-up, rinse scalp after outdoors.";
  }
  if (score >= 33) {
    return "Moderate — light routine, watch for itch/redness, stay hydrated.";
  }
  return "Low risk — a good day. Stick to your normal care routine.";
}

// Turn OpenWeatherMap 3-hour list into per-day summaries (avg humidity/temp, total rain).
function aggregateForecast(list) {
  const byDay = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!byDay[date]) byDay[date] = { hums: [], temps: [], rain: 0 };
    byDay[date].hums.push(item.main.humidity);
    byDay[date].temps.push(item.main.temp);
    byDay[date].rain += item.rain?.["3h"] || 0;
  });
  return Object.keys(byDay)
    .slice(0, 5)
    .map((date) => {
      const d = byDay[date];
      const avg = (a) => a.reduce((s, x) => s + x, 0) / a.length;
      return {
        date,
        humidity: Math.round(avg(d.hums)),
        temp: Math.round(avg(d.temps)),
        rain: Math.round(d.rain),
      };
    });
}

// Demo data (used when no API key) — realistic tropical Sri Lanka values.
function mockForecast() {
  const base = [
    { humidity: 88, temp: 30, rain: 4 },
    { humidity: 92, temp: 29, rain: 12 },
    { humidity: 84, temp: 31, rain: 2 },
    { humidity: 79, temp: 32, rain: 0 },
    { humidity: 90, temp: 30, rain: 8 },
  ];
  const today = new Date();
  return base.map((b, i) => {
    const dt = new Date(today);
    dt.setDate(today.getDate() + i + 1);
    return { date: dt.toISOString().split("T")[0], ...b };
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function FlareForecastScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState("Normal Healthy");
  const [days, setDays] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = auth.currentUser;
    try {
      // Latest scan condition
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
      // Weather forecast
      if (WEATHER_API_KEY) {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${WEATHER_API_KEY}`,
        );
        const data = await res.json();
        if (data.list) {
          setDays(aggregateForecast(data.list));
          setIsLive(true);
        } else {
          setDays(mockForecast());
        }
      } else {
        setDays(mockForecast());
      }
    } catch (error) {
      console.log("Forecast load error:", error);
      setDays(mockForecast());
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

  // Compute risk for each day + find the peak risk day
  const scored = days.map((d) => ({
    ...d,
    score: riskForDay(condition, d.humidity, d.temp, d.rain),
  }));
  const peak = scored.reduce((a, b) => (b.score > a.score ? b : a), scored[0]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Flare-Up Forecast</Text>
      <Text style={styles.subtitle}>
        Predicted for {condition} · next {scored.length} days
      </Text>

      {/* Week outlook */}
      <View style={styles.outlookCard}>
        <Text style={styles.outlookLabel}>🌦️ This week's outlook</Text>
        <Text style={styles.outlookText}>
          Highest flare risk on{" "}
          <Text
            style={{ color: riskLabel(peak.score).color, fontWeight: "bold" }}
          >
            {formatDate(peak.date)} ({riskLabel(peak.score).label})
          </Text>
          . Plan gentle care and keep your scalp dry on high-risk days.
        </Text>
        {!isLive && (
          <Text style={styles.demoTag}>
            Demo data — add your OpenWeatherMap key for live forecast.
          </Text>
        )}
      </View>

      {/* Per-day forecast cards */}
      {scored.map((d, i) => {
        const r = riskLabel(d.score);
        return (
          <View key={i} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayDate}>{formatDate(d.date)}</Text>
              <View style={[styles.riskBadge, { backgroundColor: r.color }]}>
                <Text style={styles.riskBadgeText}>{r.label}</Text>
              </View>
            </View>

            <Text style={styles.weatherLine}>
              💧 {d.humidity}% humidity · 🌡️ {d.temp}°C · 🌧️ {d.rain}mm
            </Text>

            {/* Risk bar */}
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${d.score}%`, backgroundColor: r.color },
                ]}
              />
            </View>
            <Text style={[styles.riskScore, { color: r.color }]}>
              Risk {d.score}/100
            </Text>

            <Text style={styles.advice}>{adviceFor(condition, d.score)}</Text>
          </View>
        );
      })}

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
  back: { color: "#52B788", fontSize: 15, marginBottom: 10 },
  title: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  subtitle: { color: "#52B788", fontSize: 14, marginTop: 4, marginBottom: 16 },
  outlookCard: {
    backgroundColor: "#152030",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  outlookLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  outlookText: { color: "#A8DADC", fontSize: 13, lineHeight: 20 },
  demoTag: {
    color: "#F4A261",
    fontSize: 11,
    marginTop: 8,
    fontStyle: "italic",
  },
  dayCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dayDate: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  riskBadge: { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 4 },
  riskBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
  weatherLine: { color: "#A8DADC", fontSize: 13, marginBottom: 10 },
  barTrack: {
    height: 8,
    backgroundColor: "#0D1B2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: { height: 8, borderRadius: 4 },
  riskScore: { fontSize: 12, marginTop: 6, fontWeight: "600" },
  advice: { color: "#FFFFFF", fontSize: 13, lineHeight: 19, marginTop: 8 },
});
