import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const API_KEY = "e2c3def2faecbb2cb68da8c30e02cc50";

export default function WeatherScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Negombo");
  const insets = useSafeAreaInsets();

  const cities = [
    "Colombo",
    "Negombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Trincomalee",
  ];

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},LK&appid=${API_KEY}&units=metric`,
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
      } else {
        setError("City not found");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const getScalpAdvice = (temp, humidity) => {
    const advice = [];
    if (humidity > 80) {
      advice.push({
        icon: "💧",
        text: "High humidity — oily scalp risk. Use lightweight shampoo.",
      });
      advice.push({
        icon: "🚿",
        text: "Wash hair every 2 days to prevent oil buildup.",
      });
    } else if (humidity < 40) {
      advice.push({
        icon: "🏜️",
        text: "Low humidity — dry scalp risk. Deep condition your hair.",
      });
      advice.push({
        icon: "🫙",
        text: "Apply coconut oil to prevent scalp dryness.",
      });
    } else {
      advice.push({
        icon: "✅",
        text: "Humidity is ideal for your scalp health today.",
      });
    }

    if (temp > 32) {
      advice.push({
        icon: "☀️",
        text: "High heat — cover your hair outdoors to prevent UV damage.",
      });
      advice.push({
        icon: "💦",
        text: "Drink 2L+ water to keep scalp hydrated.",
      });
    } else if (temp < 20) {
      advice.push({
        icon: "🧣",
        text: "Cool weather — good for hair growth. Enjoy!",
      });
    }

    return advice;
  };

  const getWeatherEmoji = (main) => {
    const map = {
      Clear: "☀️",
      Clouds: "⛅",
      Rain: "🌧️",
      Drizzle: "🌦️",
      Thunderstorm: "⛈️",
      Mist: "🌫️",
      Haze: "🌫️",
      Fog: "🌫️",
    };
    return map[main] || "🌤️";
  };

  const getHumidityLevel = (humidity) => {
    if (humidity > 80) return { label: "Very High", color: "#E63946" };
    if (humidity > 60) return { label: "High", color: "#F4A261" };
    if (humidity > 40) return { label: "Normal", color: "#52B788" };
    return { label: "Low", color: "#A8DADC" };
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Weather & Hair Care</Text>
        <View />
      </View>

      {/* City Selector */}
      <Text style={styles.sectionTitle}>📍 Select Your City</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cityScroll}
      >
        {cities.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.cityBtn, city === c && styles.cityBtnActive]}
            onPress={() => fetchWeather(c)}
          >
            <Text
              style={[styles.cityText, city === c && styles.cityTextActive]}
            >
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#52B788" />
          <Text style={styles.loadingText}>Fetching weather...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => fetchWeather(city)}
          >
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        weather && (
          <View>
            {/* Main Weather Card */}
            <View style={styles.weatherCard}>
              <Text style={styles.weatherEmoji}>
                {getWeatherEmoji(weather.weather[0].main)}
              </Text>
              <Text style={styles.cityName}>{weather.name}, Sri Lanka</Text>
              <Text style={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </Text>
              <Text style={styles.weatherDesc}>
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{weather.main.humidity}%</Text>
                  <Text style={styles.statLabel}>💧 Humidity</Text>
                  <Text
                    style={[
                      styles.statLevel,
                      { color: getHumidityLevel(weather.main.humidity).color },
                    ]}
                  >
                    {getHumidityLevel(weather.main.humidity).label}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {Math.round(weather.main.feels_like)}°C
                  </Text>
                  <Text style={styles.statLabel}>🌡️ Feels Like</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{weather.wind.speed} m/s</Text>
                  <Text style={styles.statLabel}>💨 Wind</Text>
                </View>
              </View>
            </View>

            {/* Scalp Advice */}
            <Text style={styles.sectionTitle}>💆 Today's Scalp Advice</Text>
            <View style={styles.adviceCard}>
              {getScalpAdvice(weather.main.temp, weather.main.humidity).map(
                (advice, index) => (
                  <View key={index} style={styles.adviceRow}>
                    <Text style={styles.adviceIcon}>{advice.icon}</Text>
                    <Text style={styles.adviceText}>{advice.text}</Text>
                  </View>
                ),
              )}
            </View>

            {/* Humidity Impact */}
            <Text style={styles.sectionTitle}>📊 Humidity Impact on Hair</Text>
            <View style={styles.impactCard}>
              <View style={styles.impactRow}>
                <Text style={styles.impactLabel}>Scalp Oiliness Risk</Text>
                <View style={styles.impactBar}>
                  <View
                    style={[
                      styles.impactFill,
                      {
                        width: `${Math.min(weather.main.humidity, 100)}%`,
                        backgroundColor:
                          weather.main.humidity > 70 ? "#E63946" : "#52B788",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.impactValue}>{weather.main.humidity}%</Text>
              </View>
              <View style={styles.impactRow}>
                <Text style={styles.impactLabel}>UV Damage Risk</Text>
                <View style={styles.impactBar}>
                  <View
                    style={[
                      styles.impactFill,
                      {
                        width:
                          weather.weather[0].main === "Clear"
                            ? "80%"
                            : weather.weather[0].main === "Clouds"
                              ? "40%"
                              : "20%",
                        backgroundColor:
                          weather.weather[0].main === "Clear"
                            ? "#E63946"
                            : "#52B788",
                      },
                    ]}
                  />
                </View>
                <Text style={styles.impactValue}>
                  {weather.weather[0].main === "Clear"
                    ? "High"
                    : weather.weather[0].main === "Clouds"
                      ? "Med"
                      : "Low"}
                </Text>
              </View>
            </View>

            {/* Refresh */}
            <TouchableOpacity
              style={styles.refreshBtn}
              onPress={() => fetchWeather(city)}
            >
              <Text style={styles.refreshBtnText}>🔄 Refresh Weather</Text>
            </TouchableOpacity>
          </View>
        )
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
    marginBottom: 20,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cityScroll: { marginBottom: 20 },
  cityBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#2A3F52",
  },
  cityBtnActive: { backgroundColor: "#52B788", borderColor: "#52B788" },
  cityText: { color: "#A8DADC", fontSize: 13 },
  cityTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  loadingBox: { alignItems: "center", paddingVertical: 40 },
  loadingText: { color: "#A8DADC", marginTop: 12 },
  errorBox: { alignItems: "center", paddingVertical: 40 },
  errorText: { color: "#E63946", fontSize: 15, marginBottom: 12 },
  retryBtn: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 24,
  },
  retryBtnText: { color: "#FFFFFF", fontWeight: "bold" },
  weatherCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  weatherEmoji: { fontSize: 60, marginBottom: 8 },
  cityName: { color: "#A8DADC", fontSize: 14, marginBottom: 4 },
  temperature: { color: "#FFFFFF", fontSize: 56, fontWeight: "bold" },
  weatherDesc: { color: "#A8DADC", fontSize: 14, marginBottom: 16 },
  statsRow: { flexDirection: "row", gap: 12, width: "100%" },
  statBox: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  statValue: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  statLabel: { color: "#A8DADC", fontSize: 10, marginTop: 4 },
  statLevel: { fontSize: 10, fontWeight: "bold", marginTop: 2 },
  adviceCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  adviceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 10,
  },
  adviceIcon: { fontSize: 20 },
  adviceText: { color: "#A8DADC", fontSize: 13, flex: 1, lineHeight: 20 },
  impactCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  impactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  impactLabel: { color: "#A8DADC", fontSize: 12, width: 110 },
  impactBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#0D1B2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  impactFill: { height: "100%", borderRadius: 4 },
  impactValue: {
    color: "#FFFFFF",
    fontSize: 12,
    width: 30,
    textAlign: "right",
  },
  refreshBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  refreshBtnText: { color: "#52B788", fontSize: 15, fontWeight: "bold" },
});
