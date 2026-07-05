import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";

export default function DoctorConsultationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("doctors");
  const [searchText, setSearchText] = useState("");

  const doctors = [
    {
      name: "Dr. Priya Ratnayake",
      specialty: "Dermatologist",
      hospital: "National Hospital Colombo",
      location: "Colombo 10",
      phone: "+94 11 269 1111",
      rating: 4.8,
      available: true,
      languages: ["English", "Sinhala", "Tamil"],
    },
    {
      name: "Dr. Kumaran Sivakumar",
      specialty: "Trichologist",
      hospital: "Jaffna Teaching Hospital",
      location: "Jaffna",
      phone: "+94 21 222 2261",
      rating: 4.9,
      available: true,
      languages: ["Tamil", "English"],
    },
    {
      name: "Dr. Amali Perera",
      specialty: "Dermatologist",
      hospital: "Kandy General Hospital",
      location: "Kandy",
      phone: "+94 81 222 2261",
      rating: 4.7,
      available: false,
      languages: ["Sinhala", "English"],
    },
    {
      name: "Dr. Rajan Navaratnam",
      specialty: "Hair Specialist",
      hospital: "Colombo South Teaching Hospital",
      location: "Kalubowila",
      phone: "+94 11 251 7777",
      rating: 4.6,
      available: true,
      languages: ["Tamil", "Sinhala", "English"],
    },
    {
      name: "Dr. Sanduni Fernando",
      specialty: "Dermatologist",
      hospital: "Lady Ridgeway Hospital",
      location: "Colombo 8",
      phone: "+94 11 269 3711",
      rating: 4.5,
      available: true,
      languages: ["Sinhala", "English"],
    },
  ];

  const healthReport = {
    lastScan: "Jul 5, 2026",
    condition: "Folliculitis",
    severity: "Moderate",
    hairType: "Wavy",
    scalpType: "Oily",
    scanHistory: [
      { date: "Jul 5, 2026", condition: "Folliculitis", severity: "Moderate" },
      { date: "Jun 28, 2026", condition: "Dandruff", severity: "Mild" },
      { date: "Jun 15, 2026", condition: "Folliculitis", severity: "Severe" },
    ],
    recommendations: [
      "Apply coconut oil 2-3x per week",
      "Use mild sulfate-free shampoo",
      "Avoid heat styling",
    ],
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchText.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchText.toLowerCase()) ||
      d.location.toLowerCase().includes(searchText.toLowerCase()),
  );

  const callDoctor = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Doctor Consultation</Text>
        <View />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "doctors" && styles.tabActive]}
          onPress={() => setActiveTab("doctors")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "doctors" && styles.tabTextActive,
            ]}
          >
            👨‍⚕️ Find Doctors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "report" && styles.tabActive]}
          onPress={() => setActiveTab("report")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "report" && styles.tabTextActive,
            ]}
          >
            📋 Health Report
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "doctors" ? (
        <View>
          {/* Search */}
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, specialty, location..."
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <Text style={styles.sectionTitle}>
            🏥 Dermatologists in Sri Lanka
          </Text>

          {filteredDoctors.map((doctor, index) => (
            <View key={index} style={styles.doctorCard}>
              {/* Doctor Header */}
              <View style={styles.doctorHeader}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.doctorAvatarText}>
                    {doctor.name.split(" ")[1][0]}
                  </Text>
                </View>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingStars}>⭐</Text>
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                    <View
                      style={[
                        styles.availBadge,
                        {
                          backgroundColor: doctor.available
                            ? "#52B78820"
                            : "#E6394620",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.availText,
                          { color: doctor.available ? "#52B788" : "#E63946" },
                        ]}
                      >
                        {doctor.available ? "● Available" : "● Unavailable"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Hospital + Location */}
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🏥</Text>
                <Text style={styles.infoText}>{doctor.hospital}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{doctor.location}</Text>
              </View>

              {/* Languages */}
              <View style={styles.langRow}>
                {doctor.languages.map((lang, i) => (
                  <View key={i} style={styles.langBadge}>
                    <Text style={styles.langText}>{lang}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => callDoctor(doctor.phone)}
                >
                  <Text style={styles.callBtnText}>📞 Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() => setActiveTab("report")}
                >
                  <Text style={styles.shareBtnText}>📤 Share Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        // Health Report Tab
        <View>
          <View style={styles.reportCard}>
            <Text style={styles.reportTitle}>📋 Your Health Report</Text>
            <Text style={styles.reportSubtitle}>
              Share this with your dermatologist
            </Text>

            {/* Current Status */}
            <View style={styles.reportSection}>
              <Text style={styles.reportSectionTitle}>
                🔍 Current Condition
              </Text>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Condition</Text>
                <Text style={styles.reportValue}>{healthReport.condition}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Severity</Text>
                <Text style={[styles.reportValue, { color: "#F4A261" }]}>
                  {healthReport.severity}
                </Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Last Scan</Text>
                <Text style={styles.reportValue}>{healthReport.lastScan}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Hair Type</Text>
                <Text style={styles.reportValue}>{healthReport.hairType}</Text>
              </View>
              <View style={styles.reportRow}>
                <Text style={styles.reportLabel}>Scalp Type</Text>
                <Text style={styles.reportValue}>{healthReport.scalpType}</Text>
              </View>
            </View>

            {/* Scan History */}
            <View style={styles.reportSection}>
              <Text style={styles.reportSectionTitle}>📅 Scan History</Text>
              {healthReport.scanHistory.map((scan, index) => (
                <View key={index} style={styles.historyItem}>
                  <View
                    style={[
                      styles.historyDot,
                      {
                        backgroundColor:
                          scan.severity === "Severe"
                            ? "#E63946"
                            : scan.severity === "Moderate"
                              ? "#F4A261"
                              : "#52B788",
                      },
                    ]}
                  />
                  <View style={styles.historyContent}>
                    <Text style={styles.historyCondition}>
                      {scan.condition}
                    </Text>
                    <Text style={styles.historyDate}>{scan.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.historySeverity,
                      {
                        color:
                          scan.severity === "Severe"
                            ? "#E63946"
                            : scan.severity === "Moderate"
                              ? "#F4A261"
                              : "#52B788",
                      },
                    ]}
                  >
                    {scan.severity}
                  </Text>
                </View>
              ))}
            </View>

            {/* Recommendations */}
            <View style={styles.reportSection}>
              <Text style={styles.reportSectionTitle}>
                💊 Current Treatment
              </Text>
              {healthReport.recommendations.map((rec, index) => (
                <Text key={index} style={styles.recItem}>
                  • {rec}
                </Text>
              ))}
            </View>
          </View>

          {/* Share Buttons */}
          <TouchableOpacity style={styles.whatsappBtn}>
            <Text style={styles.whatsappBtnText}>💬 Share via WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailBtn}>
            <Text style={styles.emailBtnText}>📧 Share via Email</Text>
          </TouchableOpacity>
        </View>
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
  tabActive: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 12 },
  tabTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A3F52",
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  doctorCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#52B788",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  doctorAvatarText: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  doctorInfo: { flex: 1 },
  doctorName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  doctorSpecialty: { color: "#52B788", fontSize: 12, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingStars: { fontSize: 12 },
  ratingText: { color: "#FFFFFF", fontSize: 12 },
  availBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  availText: { fontSize: 10, fontWeight: "bold" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  infoIcon: { fontSize: 14 },
  infoText: { color: "#A8DADC", fontSize: 13 },
  langRow: { flexDirection: "row", gap: 6, marginBottom: 12, marginTop: 4 },
  langBadge: {
    backgroundColor: "#0D1B2A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  langText: { color: "#A8DADC", fontSize: 11 },
  actionRow: { flexDirection: "row", gap: 10 },
  callBtn: {
    flex: 1,
    backgroundColor: "#52B788",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  callBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  shareBtn: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#52B788",
  },
  shareBtnText: { color: "#52B788", fontSize: 13, fontWeight: "bold" },
  reportCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  reportTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reportSubtitle: { color: "#A8DADC", fontSize: 12, marginBottom: 16 },
  reportSection: { marginBottom: 16 },
  reportSectionTitle: {
    color: "#52B788",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  reportLabel: { color: "#A8DADC", fontSize: 13 },
  reportValue: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
    gap: 10,
  },
  historyDot: { width: 10, height: 10, borderRadius: 5 },
  historyContent: { flex: 1 },
  historyCondition: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  historyDate: { color: "#A8DADC", fontSize: 11 },
  historySeverity: { fontSize: 12, fontWeight: "bold" },
  recItem: { color: "#A8DADC", fontSize: 13, marginBottom: 6 },
  whatsappBtn: {
    backgroundColor: "#25D366",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  whatsappBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  emailBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  emailBtnText: { color: "#52B788", fontSize: 15, fontWeight: "bold" },
});
