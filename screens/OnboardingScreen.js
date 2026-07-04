import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    gender: "",
    age: "",
    hairType: "",
    mainConcern: "",
  });

  const questions = [
    {
      key: "gender",
      title: "What is your gender?",
      subtitle: "This helps us personalize your hair care plan",
      emoji: "👤",
      options: [
        { label: "Male", emoji: "👨" },
        { label: "Female", emoji: "👩" },
        { label: "Non-binary", emoji: "🧑" },
        { label: "Prefer not to say", emoji: "🔒" },
      ],
    },
    {
      key: "age",
      title: "What is your age group?",
      subtitle: "Hair care needs change with age",
      emoji: "🎂",
      options: [
        { label: "Under 20", emoji: "🧒" },
        { label: "20 - 30", emoji: "🧑" },
        { label: "30 - 40", emoji: "👨" },
        { label: "40+", emoji: "🧓" },
      ],
    },
    {
      key: "hairType",
      title: "What is your hair type?",
      subtitle: "Select the option that best matches your hair",
      emoji: "💇",
      options: [
        { label: "Straight", emoji: "➖" },
        { label: "Wavy", emoji: "〰️" },
        { label: "Curly", emoji: "🌀" },
        { label: "Coily", emoji: "🔄" },
      ],
    },
    {
      key: "mainConcern",
      title: "What is your main hair concern?",
      subtitle: "We will focus your plan on this",
      emoji: "🎯",
      options: [
        { label: "Hair Loss / Thinning", emoji: "😟" },
        { label: "Dandruff / Flaking", emoji: "❄️" },
        { label: "Scalp Issues", emoji: "🔍" },
        { label: "General Hair Care", emoji: "✨" },
      ],
    },
  ];

  const currentQ = questions[step];

  const selectOption = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: option }));
  };

  const goNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // If hair loss concern, go to assessment
      if (answers.mainConcern === "Hair Loss / Thinning") {
        navigation.replace("HairLossAssessment");
      } else {
        navigation.replace("Main");
      }
    }
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const isSelected = answers[currentQ.key] !== "";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌿 TropiHair</Text>
        <Text style={styles.subtitle}>Let's personalize your hair care</Text>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {questions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === step && styles.dotActive,
              index < step && styles.dotDone,
            ]}
          />
        ))}
      </View>
      <Text style={styles.stepText}>
        Step {step + 1} of {questions.length}
      </Text>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionEmoji}>{currentQ.emoji}</Text>
        <Text style={styles.questionTitle}>{currentQ.title}</Text>
        <Text style={styles.questionSubtitle}>{currentQ.subtitle}</Text>

        {/* Options */}
        {currentQ.options.map((option) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.optionBtn,
              answers[currentQ.key] === option.label &&
                styles.optionBtnSelected,
            ]}
            onPress={() => selectOption(option.label)}
          >
            <Text style={styles.optionEmoji}>{option.emoji}</Text>
            <Text
              style={[
                styles.optionText,
                answers[currentQ.key] === option.label &&
                  styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
            {answers[currentQ.key] === option.label && (
              <Text style={styles.checkIcon}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.navRow}>
        {step > 0 ? (
          <TouchableOpacity style={styles.backBtn} onPress={goPrev}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        <TouchableOpacity
          style={[styles.nextBtn, !isSelected && styles.nextBtnDisabled]}
          onPress={goNext}
          disabled={!isSelected}
        >
          <Text style={styles.nextBtnText}>
            {step === questions.length - 1 ? "✅ Get Started" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.replace("Main")}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { fontSize: 26, fontWeight: "bold", color: "#52B788", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#A8DADC", textAlign: "center" },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1B2A3B",
    borderWidth: 1,
    borderColor: "#52B788",
  },
  dotActive: { backgroundColor: "#52B788", width: 24 },
  dotDone: { backgroundColor: "#52B788" },
  stepText: {
    color: "#A8DADC",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  questionEmoji: { fontSize: 36, textAlign: "center", marginBottom: 10 },
  questionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  questionSubtitle: {
    color: "#A8DADC",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1B2A3B",
  },
  optionBtnSelected: {
    borderColor: "#52B788",
    backgroundColor: "#52B78820",
  },
  optionEmoji: { fontSize: 20, marginRight: 12 },
  optionText: { color: "#A8DADC", fontSize: 14, flex: 1 },
  optionTextSelected: { color: "#52B788", fontWeight: "bold" },
  checkIcon: { color: "#52B788", fontSize: 16, fontWeight: "bold" },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  backBtn: {
    flex: 1,
    backgroundColor: "#1B2A3B",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  backBtnText: { color: "#A8DADC", fontSize: 15 },
  nextBtn: {
    flex: 2,
    backgroundColor: "#52B788",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  nextBtnDisabled: { backgroundColor: "#1B2A3B" },
  nextBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  skipText: {
    color: "#666",
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
