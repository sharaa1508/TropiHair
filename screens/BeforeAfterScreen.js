import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function BeforeAfterScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("compare");

  const comparisons = [
    {
      id: 1,
      date: "Jun 1, 2026",
      condition: "Folliculitis",
      severity: "Severe",
      severityColor: "#E63946",
      note: "Started treatment with Neem Oil",
    },
    {
      id: 2,
      date: "Jun 15, 2026",
      condition: "Folliculitis",
      severity: "Moderate",
      severityColor: "#F4A261",
      note: "Improvement noticed after 2 weeks",
    },
    {
      id: 3,
      date: "Jul 5, 2026",
      condition: "Folliculitis",
      severity: "Mild",
      severityColor: "#52B788",
      note: "Significant improvement!",
    },
  ];

  const progressStats = [
    { label: "Days on Treatment", value: "34", icon: "📅" },
    { label: "Scans Completed", value: "3", icon: "📸" },
    { label: "Improvement", value: "65%", icon: "📈" },
    { label: "Streak", value: "12 days", icon: "🔥" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Progress Tracker</Text>
        <View />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "compare" && styles.tabActive]}
          onPress={() => setActiveTab("compare")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "compare" && styles.tabTextActive,
            ]}
          >
            🔄 Before/After
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "timeline" && styles.tabActive]}
          onPress={() => setActiveTab("timeline")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "timeline" && styles.tabTextActive,
            ]}
          >
            📅 Timeline
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "compare" ? (
        <View>
          {/* Progress Stats */}
          <View style={styles.statsGrid}>
            {progressStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Before/After Comparison */}
          <Text style={styles.sectionTitle}>📸 Photo Comparison</Text>
          <View style={styles.compareCard}>
            {/* Before */}
            <View style={styles.compareBox}>
              <Text style={styles.compareLabel}>BEFORE</Text>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoIcon}>📷</Text>
                <Text style={styles.photoDate}>Jun 1, 2026</Text>
                <View
                  style={[styles.severityTag, { backgroundColor: "#E6394620" }]}
                >
                  <Text style={[styles.severityTagText, { color: "#E63946" }]}>
                    Severe
                  </Text>
                </View>
              </View>
            </View>

            {/* Arrow */}
            <View style={styles.arrowBox}>
              <Text style={styles.arrow}>→</Text>
              <Text style={styles.arrowLabel}>34 days</Text>
            </View>

            {/* After */}
            <View style={styles.compareBox}>
              <Text style={styles.compareLabel}>AFTER</Text>
              <View style={[styles.photoPlaceholder, styles.photoAfter]}>
                <Text style={styles.photoIcon}>📷</Text>
                <Text style={styles.photoDate}>Jul 5, 2026</Text>
                <View
                  style={[styles.severityTag, { backgroundColor: "#52B78820" }]}
                >
                  <Text style={[styles.severityTagText, { color: "#52B788" }]}>
                    Mild
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Improvement Bar */}
          <View style={styles.improvementCard}>
            <Text style={styles.improvementTitle}>📈 Overall Improvement</Text>
            <View style={styles.improvementBar}>
              <View style={styles.improvementFill} />
            </View>
            <View style={styles.improvementLabels}>
              <Text style={styles.improvementStart}>Severe</Text>
              <Text style={styles.improvementPercent}>65% Better</Text>
              <Text style={styles.improvementEnd}>Mild</Text>
            </View>
          </View>

          {/* Add New Photo */}
          <TouchableOpacity
            style={styles.addPhotoBtn}
            onPress={() => navigation.navigate("Main", { screen: "Scan" })}
          >
            <Text style={styles.addPhotoBtnText}>📸 Add New Scan Photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Timeline Tab
        <View>
          <Text style={styles.sectionTitle}>📅 Treatment Timeline</Text>
          {comparisons.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              {/* Timeline Line */}
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.timelineDot,
                    { backgroundColor: item.severityColor },
                  ]}
                />
                {index < comparisons.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Content */}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineDate}>{item.date}</Text>
                <View style={styles.timelineCard}>
                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineCondition}>
                      {item.condition}
                    </Text>
                    <View
                      style={[
                        styles.severityBadge,
                        { backgroundColor: item.severityColor + "20" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.severityBadgeText,
                          { color: item.severityColor },
                        ]}
                      >
                        {item.severity}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.timelineNote}>{item.note}</Text>

                  {/* Photo placeholder */}
                  <View style={styles.timelinePhoto}>
                    <Text style={styles.timelinePhotoIcon}>📷</Text>
                    <Text style={styles.timelinePhotoText}>
                      Tap to view photo
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Progress Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>🎯 Treatment Summary</Text>
            <Text style={styles.summaryText}>
              In 34 days, your Folliculitis improved from Severe to Mild.
              Continue your routine for full recovery!
            </Text>
            <TouchableOpacity
              style={styles.routineBtn}
              onPress={() => navigation.navigate("Routine")}
            >
              <Text style={styles.routineBtnText}>📅 View My Routine</Text>
            </TouchableOpacity>
          </View>
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
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
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
  tabText: { color: "#A8DADC", fontSize: 13 },
  tabTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    width: "47%",
  },
  statIcon: { fontSize: 24, marginBottom: 6 },
  statValue: { color: "#52B788", fontSize: 22, fontWeight: "bold" },
  statLabel: {
    color: "#A8DADC",
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  compareCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  compareBox: { flex: 1, alignItems: "center" },
  compareLabel: {
    color: "#A8DADC",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
  },
  photoPlaceholder: {
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E6394640",
  },
  photoAfter: { borderColor: "#52B78840" },
  photoIcon: { fontSize: 32, marginBottom: 6 },
  photoDate: { color: "#A8DADC", fontSize: 10, marginBottom: 6 },
  severityTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  severityTagText: { fontSize: 10, fontWeight: "bold" },
  arrowBox: { alignItems: "center", paddingHorizontal: 8 },
  arrow: { color: "#52B788", fontSize: 24, fontWeight: "bold" },
  arrowLabel: { color: "#A8DADC", fontSize: 9, marginTop: 4 },
  improvementCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  improvementTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  improvementBar: {
    height: 12,
    backgroundColor: "#0D1B2A",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  improvementFill: {
    height: "100%",
    width: "65%",
    backgroundColor: "#52B788",
    borderRadius: 6,
  },
  improvementLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  improvementStart: { color: "#E63946", fontSize: 11 },
  improvementPercent: { color: "#52B788", fontSize: 11, fontWeight: "bold" },
  improvementEnd: { color: "#52B788", fontSize: 11 },
  addPhotoBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  addPhotoBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  timelineLeft: { alignItems: "center", width: 30, marginRight: 12 },
  timelineDot: { width: 14, height: 14, borderRadius: 7 },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#2A3F52",
    marginTop: 4,
  },
  timelineContent: { flex: 1, paddingBottom: 16 },
  timelineDate: { color: "#A8DADC", fontSize: 11, marginBottom: 6 },
  timelineCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 14,
    padding: 14,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  timelineCondition: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  severityBadgeText: { fontSize: 11, fontWeight: "bold" },
  timelineNote: { color: "#A8DADC", fontSize: 12, marginBottom: 10 },
  timelinePhoto: {
    backgroundColor: "#0D1B2A",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timelinePhotoIcon: { fontSize: 20 },
  timelinePhotoText: { color: "#666", fontSize: 12 },
  summaryCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryText: {
    color: "#A8DADC",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  routineBtn: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  routineBtnText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});
