// notifications.js — TropiHair real push (local scheduled) notifications
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

// When a notification arrives while app is open, show it (banner + sound)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Ask the user for notification permission. Call once (e.g. on screen load).
export async function registerForNotifications() {
  if (!Device.isDevice) {
    console.log("Notifications need a real device (not emulator).");
    return false;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted.");
    return false;
  }

  // Android needs a notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "TropiHair Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#52B788",
    });
  }

  return true;
}

// Fire a notification immediately — used for the "Test" button
export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌿 TropiHair",
      body: "Notifications are working! You'll get scalp care reminders here.",
      sound: true,
    },
    trigger: null, // null = fire right now
  });
}

// Schedule a DAILY repeating reminder at a given hour/minute.
// Returns an ID so we can cancel it later when the user toggles OFF.
export async function scheduleDailyReminder(hour, minute, title, body) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: title || "🌿 TropiHair Reminder",
      body: body || "Time for your scalp care routine!",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute,
    },
  });
  return id;
}

// Cancel one scheduled reminder by its ID
export async function cancelReminder(id) {
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}

// Cancel everything (useful for a reset)
export async function cancelAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
