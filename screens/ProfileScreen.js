import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      // User profile
      const profileSnap = await getDoc(doc(db, "users", user.uid));
      if (profileSnap.exists()) {
        setProfile({ email: user.email, ...profileSnap.data() });
      } else {
        setProfile({ email: user.email });
      }

      // Scan history (newest first)
      const scansQuery = query(
        collection(db, "users", user.uid, "scans"),
        orderBy("timestamp", "desc"),
      );
      const scansSnap = await getDocs(scansQuery);
      const scanList = scansSnap.docs.map((d) => d.data());
      setScans(scanList);
    } catch (error) {
      console.log("Profile load error:", error);
    } finally {
      setLoading(false);
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
            (parent || navigation).reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            Alert.alert("Error", "Could not logout. Please try again.");
          }
        },
      },
    ]);
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return (
        d.toLocaleDateString() +
        " " +
        d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } catch {
      return "";
    }
  };

  const initial = (profile?.name || profile?.email || "U")
    .charAt(0)
    .toUpperCase();

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#52B788" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Avatar + name */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.name}>{profile?.name || "TropiHair User"}</Text>
        <Text style={styles.email}>{profile?.email || ""}</Text>
      </View>

      {/* Profile details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>👤 My Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender</Text>
          <Text style={styles.detailValue}>{profile?.gender || "—"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Age Group</Text>
          <Text style={styles.detailValue}>{profile?.ageGroup || "—"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hair Type</Text>
          <Text style={styles.detailValue}>{profile?.hairType || "—"}</Text>
        </View>
        <View style={[styles.detailRow, styles.detailRowLast]}>
          <Text style={styles.detailLabel}>Main Concern</Text>
          <Text style={styles.detailValue}>{profile?.mainConcern || "—"}</Text>
        </View>
      </View>

      {/* Scan history */}
      <View style={styles.historyCard}>
        <Text style={styles.sectionTitle}>
          📸 Scan History ({scans.length})
        </Text>
        {scans.length === 0 ? (
          <Text style={styles.emptyText}>
            No scans yet. Scan your scalp to build your history.
          </Text>
        ) : (
          scans.map((scan, i) => (
            <View key={i} style={styles.scanRow}>
              <View style={styles.scanLeft}>
                <Text style={styles.scanCondition}>{scan.condition}</Text>
                <Text style={styles.scanDate}>
                  {formatDate(scan.timestamp)}
                </Text>
              </View>
              <View style={styles.scanBadge}>
                <Text style={styles.scanConfidence}>
                  {Math.round(scan.confidence)}%
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Quick links */}
      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => navigation.navigate("BeforeAfter")}
      >
        <Text style={styles.linkText}>📊 Before / After Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() => navigation.navigate("DoctorConsultation")}
      >
        <Text style={styles.linkText}>⚕️ Find a Dermatologist</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
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
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#52B788",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#FFFFFF", fontSize: 34, fontWeight: "bold" },
  name: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  email: { color: "#A8DADC", fontSize: 13, marginTop: 4 },
  detailsCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  detailRowLast: { borderBottomWidth: 0 },
  detailLabel: { color: "#A8DADC", fontSize: 14 },
  detailValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  historyCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  emptyText: {
    color: "#A8DADC",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 16,
  },
  scanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  scanLeft: { flex: 1 },
  scanCondition: { color: "#FFFFFF", fontSize: 15, fontWeight: "600" },
  scanDate: { color: "#A8DADC", fontSize: 12, marginTop: 3 },
  scanBadge: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  scanConfidence: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  linkBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  linkText: { color: "#52B788", fontSize: 15, fontWeight: "600" },
  logoutBtn: {
    backgroundColor: "#3A1B1B",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E63946",
  },
  logoutText: { color: "#E63946", fontSize: 15, fontWeight: "bold" },
});
