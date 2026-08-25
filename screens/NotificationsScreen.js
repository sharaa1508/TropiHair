import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import {
  registerForNotifications,
  sendTestNotification,
  scheduleDailyReminder,
  cancelReminder,
} from "../notifications";

export default function NotificationsScreen({ navigation }) {
  // Each reminder now has hour/minute (for real scheduling) and notifId (to cancel)
  const [reminders, setReminders] = useState([
    {
      id: 1,
      icon: "🧴",
      title: "Oil Application",
      subtitle: "Coconut oil before wash day",
      time: "7:00 PM",
      days: "Tue, Fri",
      hour: 19,
      minute: 0,
      enabled: true,
      notifId: null,
    },
    {
      id: 2,
      icon: "🚿",
      title: "Hair Wash Day",
      subtitle: "Mild shampoo + condition",
      time: "6:30 AM",
      days: "Wed, Sat",
      hour: 6,
      minute: 30,
      enabled: true,
      notifId: null,
    },
    {
      id: 3,
      icon: "💆",
      title: "Scalp Massage",
      subtitle: "10 minutes circular motion",
      time: "9:00 PM",
      days: "Daily",
      hour: 21,
      minute: 0,
      enabled: false,
      notifId: null,
    },
    {
      id: 4,
      icon: "📸",
      title: "Weekly Scalp Scan",
      subtitle: "Track your progress",
      time: "10:00 AM",
      days: "Sunday",
      hour: 10,
      minute: 0,
      enabled: true,
      notifId: null,
    },
    {
      id: 5,
      icon: "💧",
      title: "Water Intake",
      subtitle: "Stay hydrated for healthy hair",
      time: "Every 2 hrs",
      days: "Daily",
      hour: 12,
      minute: 0,
      enabled: false,
      notifId: null,
    },
  ]);

  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [permissionOk, setPermissionOk] = useState(false);

  // Ask for permission when the screen first loads
  useEffect(() => {
    (async () => {
      const ok = await registerForNotifications();
      setPermissionOk(ok);
    })();
  }, []);

  // Mock notification history (display only)
  const history = [
    {
      id: 1,
      icon: "🌧️",
      title: "High Humidity Alert",
      message:
        "Humidity is 85% today in Negombo. Avoid heavy oils, keep scalp dry.",
      time: "2 hours ago",
      color: "#F4A261",
    },
    {
      id: 2,
      icon: "📸",
      title: "Scan Reminder",
      message:
        "It's been 7 days since your last scalp scan. Time to check progress!",
      time: "Yesterday",
      color: "#52B788",
    },
    {
      id: 3,
      icon: "🧴",
      title: "Oil Application Done",
      message: "Great job! You completed your coconut oil routine.",
      time: "2 days ago",
      color: "#52B788",
    },
    {
      id: 4,
      icon: "☀️",
      title: "UV Alert",
      message: "Strong sunlight expected today. Wear a cap when going outside.",
      time: "3 days ago",
      color: "#E63946",
    },
  ];

  // Toggle a reminder ON (schedule real notification) or OFF (cancel it)
  const toggleReminder = async (id) => {
    if (!permissionOk) {
      Alert.alert(
        "Permission Needed",
        "Please allow notifications to use reminders. Check your phone settings.",
      );
      return;
    }

    const reminder = reminders.find((r) => r.id === id);
    if (!reminder) return;

    if (!reminder.enabled) {
      // Turning ON -> schedule a real daily notification
      const notifId = await scheduleDailyReminder(
        reminder.hour,
        reminder.minute,
        `${reminder.icon} ${reminder.title}`,
        reminder.subtitle,
      );
      setReminders((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, enabled: true, notifId: notifId } : r,
        ),
      );
    } else {
      // Turning OFF -> cancel the scheduled notification
      await cancelReminder(reminder.notifId);
      setReminders((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, enabled: false, notifId: null } : r,
        ),
      );
    }
  };

  // Test button -> fire a notification right now
  const handleTest = async () => {
    if (!permissionOk) {
      Alert.alert(
        "Permission Needed",
        "Please allow notifications first (check phone settings), then try again.",
      );
      return;
    }
    await sendTestNotification();
    Alert.alert(
      "Test Sent ✅",
      "Check your notification tray — a TropiHair notification should appear!",
    );
  };

  const activeCount = reminders.filter((r) => r.enabled).length;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryIcon}>🔔</Text>
        <Text style={styles.summaryCount}>{activeCount}</Text>
        <Text style={styles.summaryLabel}>Active Reminders</Text>
      </View>

      {/* Permission status + Test button */}
      <View style={styles.testCard}>
        <Text style={styles.testStatus}>
          {permissionOk
            ? "✅ Notifications enabled"
            : "⚠️ Notifications not allowed yet"}
        </Text>
        <TouchableOpacity style={styles.testBtn} onPress={handleTest}>
          <Text style={styles.testBtnText}>🔔 Send Test Notification</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Alerts Toggle */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherLeft}>
          <Text style={styles.weatherIcon}>🌦️</Text>
          <View style={styles.weatherTextBox}>
            <Text style={styles.weatherTitle}>Weather-Based Alerts</Text>
            <Text style={styles.weatherSubtitle}>
              Humidity & UV alerts for your scalp
            </Text>
          </View>
        </View>
        <Switch
          value={weatherAlerts}
          onValueChange={setWeatherAlerts}
          trackColor={{ false: "#0D1B2A", true: "#52B788" }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Reminders Section */}
      <Text style={styles.sectionTitle}>⏰ My Reminders</Text>
      {reminders.map((reminder) => (
        <View key={reminder.id} style={styles.reminderCard}>
          <Text style={styles.reminderIcon}>{reminder.icon}</Text>
          <View style={styles.reminderInfo}>
            <Text
              style={[
                styles.reminderTitle,
                !reminder.enabled && styles.reminderDisabled,
              ]}
            >
              {reminder.title}
            </Text>
            <Text style={styles.reminderSubtitle}>{reminder.subtitle}</Text>
            <View style={styles.reminderMeta}>
              <Text style={styles.reminderTime}>🕐 {reminder.time}</Text>
              <Text style={styles.reminderDays}>{reminder.days}</Text>
            </View>
          </View>
          <Switch
            value={reminder.enabled}
            onValueChange={() => toggleReminder(reminder.id)}
            trackColor={{ false: "#0D1B2A", true: "#52B788" }}
            thumbColor="#FFFFFF"
          />
        </View>
      ))}

      {/* History Section */}
      <Text style={styles.sectionTitle}>📩 Recent Notifications</Text>
      {history.map((item) => (
        <View key={item.id} style={styles.historyCard}>
          <View
            style={[
              styles.historyIconBox,
              { backgroundColor: item.color + "22" },
            ]}
          >
            <Text style={styles.historyIcon}>{item.icon}</Text>
          </View>
          <View style={styles.historyInfo}>
            <View style={styles.historyTopRow}>
              <Text style={[styles.historyTitle, { color: item.color }]}>
                {item.title}
              </Text>
              <Text style={styles.historyTime}>{item.time}</Text>
            </View>
            <Text style={styles.historyMessage}>{item.message}</Text>
          </View>
        </View>
      ))}

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
  backBtn: { color: "#52B788", fontSize: 16, fontWeight: "bold" },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },

  summaryCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  summaryIcon: { fontSize: 32, marginBottom: 8 },
  summaryCount: { color: "#52B788", fontSize: 40, fontWeight: "bold" },
  summaryLabel: { color: "#A8DADC", fontSize: 14 },

  testCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  testStatus: { color: "#A8DADC", fontSize: 13, marginBottom: 12 },
  testBtn: {
    backgroundColor: "#52B788",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
  },
  testBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },

  weatherCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  weatherLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  weatherIcon: { fontSize: 26, marginRight: 12 },
  weatherTextBox: { flex: 1 },
  weatherTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  weatherSubtitle: { color: "#A8DADC", fontSize: 12, marginTop: 2 },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  reminderCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reminderIcon: { fontSize: 26, marginRight: 12 },
  reminderInfo: { flex: 1 },
  reminderTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  reminderDisabled: { color: "#6B7A8F" },
  reminderSubtitle: { color: "#A8DADC", fontSize: 12, marginTop: 2 },
  reminderMeta: { flexDirection: "row", marginTop: 6 },
  reminderTime: { color: "#52B788", fontSize: 12, marginRight: 12 },
  reminderDays: { color: "#A8DADC", fontSize: 12 },

  historyCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    marginBottom: 12,
  },
  historyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  historyIcon: { fontSize: 20 },
  historyInfo: { flex: 1 },
  historyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  historyTitle: { fontSize: 14, fontWeight: "bold" },
  historyTime: { color: "#6B7A8F", fontSize: 11 },
  historyMessage: { color: "#A8DADC", fontSize: 13, lineHeight: 18 },
});
