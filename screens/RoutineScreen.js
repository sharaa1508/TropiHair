import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function RoutineScreen({ navigation }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const weekPlan = [
    { day: "Mon", tasks: ["Oil", "Massage"] },
    { day: "Tue", tasks: ["Comb"] },
    { day: "Wed", tasks: ["Hair Pack", "Wash"] },
    { day: "Thu", tasks: ["Oil", "Massage"] },
    { day: "Fri", tasks: ["Comb"] },
    { day: "Sat", tasks: ["Hair Pack", "Wash"] },
    { day: "Sun", tasks: ["Rest"] },
  ];

  const todayTasks = [
    { id: 1, time: "7:00 AM", task: "Morning hair comb (5 min)", icon: "🪮" },
    { id: 2, time: "8:00 PM", task: "Apply Coconut Oil", icon: "🫙" },
    {
      id: 3,
      time: "8:10 PM",
      task: "Scalp massage in circular motion (10 min)",
      icon: "💆",
    },
    { id: 4, time: "8:45 PM", task: "Wash off with mild shampoo", icon: "🚿" },
    { id: 5, time: "9:00 PM", task: "Dry hair gently with towel", icon: "🧴" },
  ];

  const massageTips = [
    "• Use fingertips, not nails",
    "• Circular motion — 10 minutes",
    "• Part hair in sections for full coverage",
    "• Best time: evening before wash",
  ];

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Routine</Text>
        <View />
      </View>

      {/* Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <Text style={styles.progressCount}>
          {completedCount} / {todayTasks.length} tasks done
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(completedCount / todayTasks.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Weekly Plan */}
      <Text style={styles.sectionTitle}>📅 Weekly Plan</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.weekScroll}
      >
        {weekPlan.map((item, index) => (
          <View key={index} style={styles.dayCard}>
            <Text style={styles.dayText}>{item.day}</Text>
            {item.tasks.map((task, i) => (
              <Text key={i} style={styles.dayTask}>
                {task}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Today's Tasks Checklist */}
      <Text style={styles.sectionTitle}>✅ Today's Checklist</Text>
      <View style={styles.checklistCard}>
        {todayTasks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.checkRow}
            onPress={() => toggleCheck(item.id)}
          >
            <View
              style={[
                styles.checkbox,
                checkedItems[item.id] && styles.checkboxDone,
              ]}
            >
              {checkedItems[item.id] && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.checkContent}>
              <Text style={styles.checkTime}>{item.time}</Text>
              <Text
                style={[
                  styles.checkTask,
                  checkedItems[item.id] && styles.checkTaskDone,
                ]}
              >
                {item.icon} {item.task}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scalp Massage Guide */}
      <Text style={styles.sectionTitle}>💆 Scalp Massage Guide</Text>
      <View style={styles.massageCard}>
        {massageTips.map((tip, index) => (
          <Text key={index} style={styles.massageTip}>
            {tip}
          </Text>
        ))}
      </View>

      {/* Hair Wash Day */}
      <Text style={styles.sectionTitle}>🚿 Hair Wash Day Tips</Text>
      <View style={styles.washCard}>
        <Text style={styles.washStep}>1. Apply oil 45 min before wash</Text>
        <Text style={styles.washStep}>2. Use lukewarm water (not hot)</Text>
        <Text style={styles.washStep}>3. Use mild, sulfate-free shampoo</Text>
        <Text style={styles.washStep}>4. Condition mid-lengths to ends</Text>
        <Text style={styles.washStep}>
          5. Cool rinse to close hair cuticles
        </Text>
        <Text style={styles.washStep}>6. Pat dry — do not rub</Text>
      </View>

      {/* Report Button */}
      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>📊 Weekly Report</Text>
        <Text style={styles.reportText}>
          This week: {completedCount} tasks completed
        </Text>
        <Text style={styles.reportSub}>
          Keep up your routine for best results!
        </Text>
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
  progressCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  progressTitle: { color: "#A8DADC", fontSize: 13, marginBottom: 6 },
  progressCount: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#0D1B2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#52B788",
    borderRadius: 4,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  weekScroll: { marginBottom: 20 },
  dayCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    minWidth: 70,
    alignItems: "center",
  },
  dayText: {
    color: "#52B788",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  dayTask: {
    color: "#A8DADC",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 2,
  },
  checklistCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#52B788",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxDone: { backgroundColor: "#52B788" },
  checkmark: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  checkContent: { flex: 1 },
  checkTime: { color: "#52B788", fontSize: 11, marginBottom: 2 },
  checkTask: { color: "#FFFFFF", fontSize: 13 },
  checkTaskDone: { color: "#666", textDecorationLine: "line-through" },
  massageCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  massageTip: {
    color: "#A8DADC",
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 20,
  },
  washCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  washStep: { color: "#A8DADC", fontSize: 13, marginBottom: 8 },
  reportCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    alignItems: "center",
  },
  reportTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reportText: { color: "#52B788", fontSize: 14, marginBottom: 4 },
  reportSub: { color: "#A8DADC", fontSize: 12 },
});
