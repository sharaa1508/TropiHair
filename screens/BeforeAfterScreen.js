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
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function BeforeAfterScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("compare");
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, "users", user.uid, "scans"),
        orderBy("timestamp", "desc"),
      );
      const snap = await getDocs(q);
      setScans(snap.docs.map((d) => d.data()));
    } catch (error) {
      console.log("Load scans error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Newest and oldest scans for before/after comparison
  const latest = scans[0];
  const oldest = scans[scans.length - 1];
  const daysBetween =
    latest && oldest && scans.length > 1
      ? Math.round(
          (new Date(latest.timestamp) - new Date(oldest.timestamp)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back + Home */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Progress Tracker</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main", { screen: "Home" })}
        >
          <Text style={styles.headerBtn}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
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

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#52B788"
          style={{ marginTop: 40 }}
        />
      ) : scans.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📸</Text>
          <Text style={styles.emptyText}>
            No scans yet. Scan your scalp to start tracking your progress over
            time.
          </Text>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => navigation.navigate("Main", { screen: "Scan" })}
          >
            <Text style={styles.scanBtnText}>📸 Do a Scan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{scans.length}</Text>
              <Text style={styles.statLabel}>Total Scans</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{daysBetween}</Text>
              <Text style={styles.statLabel}>Days Tracked</Text>
            </View>
          </View>

          {/* ---- COMPARE TAB ---- */}
          {activeTab === "compare" &&
            (scans.length < 2 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  Do at least 2 scans to see a before/after comparison.
                </Text>
              </View>
            ) : (
              <View style={styles.compareCard}>
                <Text style={styles.sectionTitle}>📸 Before vs After</Text>
                <View style={styles.compareRow}>
                  <View style={styles.compareItem}>
                    <Text style={styles.compareLabel}>BEFORE</Text>
                    <Text style={styles.compareCondition}>
                      {oldest.condition}
                    </Text>
                    <Text style={styles.compareDate}>
                      {formatDate(oldest.timestamp)}
                    </Text>
                    <Text style={styles.compareConf}>
                      {Math.round(oldest.confidence)}%
                    </Text>
                  </View>
                  <Text style={styles.arrow}>→</Text>
                  <View style={styles.compareItem}>
                    <Text style={styles.compareLabel}>AFTER</Text>
                    <Text style={styles.compareCondition}>
                      {latest.condition}
                    </Text>
                    <Text style={styles.compareDate}>
                      {formatDate(latest.timestamp)}
                    </Text>
                    <Text style={styles.compareConf}>
                      {Math.round(latest.confidence)}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.compareNote}>
                  {oldest.condition === latest.condition
                    ? `Still showing ${latest.condition} across ${daysBetween} days.`
                    : `Changed from ${oldest.condition} to ${latest.condition}.`}
                </Text>
              </View>
            ))}

          {/* ---- TIMELINE TAB ---- */}
          {activeTab === "timeline" && (
            <View style={styles.timelineCard}>
              <Text style={styles.sectionTitle}>📅 Scan Timeline</Text>
              {scans.map((scan, i) => (
                <View key={i} style={styles.timelineRow}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineCondition}>
                      {scan.condition}
                    </Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(scan.timestamp)} ·{" "}
                      {Math.round(scan.confidence)}% confidence
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Add new scan */}
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => navigation.navigate("Main", { screen: "Scan" })}
          >
            <Text style={styles.scanBtnText}>📸 Add New Scan</Text>
          </TouchableOpacity>
        </>
      )}

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  tabActive: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#FFFFFF" },
  statsRow: { flexDirection: "row", marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statValue: { color: "#52B788", fontSize: 32, fontWeight: "bold" },
  statLabel: { color: "#A8DADC", fontSize: 12, marginTop: 4 },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  compareCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  compareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  compareItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 14,
  },
  compareLabel: { color: "#A8DADC", fontSize: 11, marginBottom: 6 },
  compareCondition: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  compareDate: { color: "#A8DADC", fontSize: 11, marginTop: 4 },
  compareConf: {
    color: "#52B788",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6,
  },
  arrow: { color: "#52B788", fontSize: 24, marginHorizontal: 8 },
  compareNote: {
    color: "#A8DADC",
    fontSize: 13,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 19,
  },
  timelineCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  timelineRow: { flexDirection: "row", marginBottom: 16 },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#52B788",
    marginTop: 4,
    marginRight: 14,
  },
  timelineContent: { flex: 1 },
  timelineCondition: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  timelineDate: { color: "#A8DADC", fontSize: 12, marginTop: 3 },
  emptyCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: {
    color: "#A8DADC",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  scanBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  scanBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
