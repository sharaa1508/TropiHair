import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [language, setLanguage] = useState("English");

  const profile = {
    name: "Thusharaa",
    hairType: "Wavy",
    scalpType: "Oily",
    waterType: "Hard Water",
    lifestyle: "Active",
    lastScan: "Today, 8:15 AM",
    condition: "Folliculitis",
    severity: "Moderate",
  };

  const scanHistory = [
    {
      date: "Jul 4, 2026",
      condition: "Folliculitis",
      severity: "Moderate",
      color: "#F4A261",
    },
    {
      date: "Jun 28, 2026",
      condition: "Dandruff",
      severity: "Mild",
      color: "#52B788",
    },
    {
      date: "Jun 15, 2026",
      condition: "Folliculitis",
      severity: "Severe",
      color: "#E63946",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <View />
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>T</Text>
        </View>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileSub}>TropiHair Member</Text>

        {/* Language Toggle */}
        <View style={styles.langRow}>
          {["English", "Tamil", "Sinhala"].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.langBtn,
                language === lang && styles.langBtnActive,
              ]}
              onPress={() => setLanguage(lang)}
            >
              <Text
                style={[
                  styles.langText,
                  language === lang && styles.langTextActive,
                ]}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hair Profile */}
      <Text style={styles.sectionTitle}>💇 Hair Profile</Text>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hair Type</Text>
          <Text style={styles.infoValue}>{profile.hairType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Scalp Type</Text>
          <Text style={styles.infoValue}>{profile.scalpType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Water Type</Text>
          <Text style={styles.infoValue}>{profile.waterType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Lifestyle</Text>
          <Text style={styles.infoValue}>{profile.lifestyle}</Text>
        </View>
      </View>

      {/* Last Scan Summary */}
      <Text style={styles.sectionTitle}>🔍 Last Scan</Text>
      <View style={styles.lastScanCard}>
        <Text style={styles.lastScanDate}>{profile.lastScan}</Text>
        <Text style={styles.lastScanCondition}>{profile.condition}</Text>
        <View style={styles.severityBadge}>
          <Text style={styles.severityText}>{profile.severity}</Text>
        </View>
      </View>

      {/* Scan History */}
      <Text style={styles.sectionTitle}>📋 Scan History</Text>
      <View style={styles.historyCard}>
        {scanHistory.map((item, index) => (
          <View key={index} style={styles.historyRow}>
            <View
              style={[styles.historyDot, { backgroundColor: item.color }]}
            />
            <View style={styles.historyContent}>
              <Text style={styles.historyCondition}>{item.condition}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <View
              style={[
                styles.historyBadge,
                { backgroundColor: item.color + "33" },
              ]}
            >
              <Text style={[styles.historyBadgeText, { color: item.color }]}>
                {item.severity}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Doctor Consultation */}
      <Text style={styles.sectionTitle}>👨‍⚕️ Doctor Consultation</Text>
      <View style={styles.doctorCard}>
        <Text style={styles.doctorText}>
          Share your health history with a dermatologist
        </Text>
        <TouchableOpacity style={styles.doctorBtn}>
          <Text style={styles.doctorBtnText}>📤 Share Health Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.findDoctorBtn}
          onPress={() => navigation.navigate("DoctorConsultation")}
        >
          <Text style={styles.findDoctorBtnText}>🏥 Find Nearby Doctors</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  profileCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#52B788",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold" },
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileSub: { color: "#A8DADC", fontSize: 13, marginBottom: 16 },
  langRow: { flexDirection: "row", gap: 8 },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  langBtnActive: { backgroundColor: "#52B788" },
  langText: { color: "#52B788", fontSize: 12 },
  langTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  infoLabel: { color: "#A8DADC", fontSize: 14 },
  infoValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  lastScanCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  lastScanDate: { color: "#A8DADC", fontSize: 12, marginBottom: 8 },
  lastScanCondition: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  severityBadge: {
    backgroundColor: "#F4A261",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  historyCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  historyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  historyContent: { flex: 1 },
  historyCondition: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  historyDate: { color: "#A8DADC", fontSize: 11 },
  historyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyBadgeText: { fontSize: 11, fontWeight: "bold" },
  doctorCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  doctorText: {
    color: "#A8DADC",
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
  doctorBtn: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  doctorBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  findDoctorBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#52B788",
  },
  findDoctorBtnText: { color: "#52B788", fontSize: 14, fontWeight: "bold" },
});
