import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function HairLossAssessmentScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    hairLossType: "",
    stage: "",
    sleepHours: "",
    stressLevel: "",
    diet: "",
    waterIntake: "",
    chemicalTreatment: "",
    sunExposure: "",
  });

  const questions = [
    {
      key: "hairLossType",
      title: "What type of hair loss are you experiencing?",
      subtitle: "Hair fall is temporary, hair loss is permanent",
      emoji: "🔍",
      options: [
        {
          label: "Hair Fall",
          desc: "More than 100 strands daily, temporary",
          emoji: "💆",
        },
        {
          label: "Patchy Hair Loss",
          desc: "Coin-sized bald patches appearing",
          emoji: "⭕",
        },
        {
          label: "Overall Thinning",
          desc: "Hair getting thinner all over",
          emoji: "📉",
        },
        {
          label: "Receding Hairline",
          desc: "Hairline moving backwards",
          emoji: "↩️",
        },
      ],
    },
    {
      key: "sleepHours",
      title: "How many hours do you sleep daily?",
      subtitle: "Sleep is critical for hair growth (8hrs recommended)",
      emoji: "😴",
      options: [
        { label: "8+ hours", desc: "Optimal for hair health", emoji: "✅" },
        { label: "6-8 hours", desc: "Slightly below ideal", emoji: "🟡" },
        { label: "4-6 hours", desc: "May cause hair fall", emoji: "🟠" },
        {
          label: "Less than 4 hours",
          desc: "High risk for hair loss",
          emoji: "🔴",
        },
      ],
    },
    {
      key: "stressLevel",
      title: "What is your current stress level?",
      subtitle: "Stress is a major cause of hair loss (Telogen Effluvium)",
      emoji: "😓",
      options: [
        { label: "Rarely stressed", desc: "Low impact on hair", emoji: "😊" },
        { label: "Occasionally stressed", desc: "Mild impact", emoji: "🙂" },
        {
          label: "Moderately stressed",
          desc: "Moderate hair fall risk",
          emoji: "😐",
        },
        { label: "Highly stressed", desc: "High hair loss risk", emoji: "😰" },
      ],
    },
    {
      key: "diet",
      title: "How would you describe your diet?",
      subtitle: "Nutrition directly affects hair growth",
      emoji: "🍽️",
      options: [
        {
          label: "Balanced & nutritious",
          desc: "Proteins, vegetables, fruits",
          emoji: "🥗",
        },
        {
          label: "Rice & curry heavy",
          desc: "Traditional Sri Lankan diet",
          emoji: "🍛",
        },
        {
          label: "Mostly junk food",
          desc: "Low nutrition, high risk",
          emoji: "🍔",
        },
        {
          label: "Skipping meals often",
          desc: "Nutritional deficiency risk",
          emoji: "⚠️",
        },
      ],
    },
    {
      key: "waterIntake",
      title: "How much water do you drink daily?",
      subtitle: "Hydration affects scalp health directly",
      emoji: "💧",
      options: [
        { label: "2L or more", desc: "Optimal hydration", emoji: "✅" },
        { label: "1-2 litres", desc: "Adequate hydration", emoji: "🟡" },
        {
          label: "Less than 1 litre",
          desc: "Low — scalp may dry out",
          emoji: "🟠",
        },
        {
          label: "I mostly drink tea/coffee",
          desc: "Dehydrating effect",
          emoji: "☕",
        },
      ],
    },
    {
      key: "sunExposure",
      title: "How much sun exposure do you get daily?",
      subtitle: "Sri Lankan sun can damage scalp without protection",
      emoji: "☀️",
      options: [
        {
          label: "Minimal (indoors mostly)",
          desc: "Low UV damage risk",
          emoji: "🏠",
        },
        { label: "1-2 hours outdoor", desc: "Moderate exposure", emoji: "🚶" },
        {
          label: "Outdoor work (3-5 hrs)",
          desc: "High UV exposure",
          emoji: "👷",
        },
        {
          label: "All day outdoors",
          desc: "Very high scalp damage risk",
          emoji: "🌞",
        },
      ],
    },
    {
      key: "chemicalTreatment",
      title: "Do you use chemical treatments on your hair?",
      subtitle: "Chemicals weaken hair follicles over time",
      emoji: "🧪",
      options: [
        {
          label: "No treatments",
          desc: "Natural, healthiest option",
          emoji: "✅",
        },
        { label: "Hair colouring", desc: "Mild chemical damage", emoji: "🎨" },
        {
          label: "Relaxers / Straightening",
          desc: "Moderate follicle damage",
          emoji: "⚠️",
        },
        { label: "Multiple treatments", desc: "High damage risk", emoji: "🔴" },
      ],
    },
  ];

  // Scoring system
  const calculateRisk = () => {
    let score = 0;
    if (answers.sleepHours === "Less than 4 hours") score += 3;
    else if (answers.sleepHours === "4-6 hours") score += 2;
    else if (answers.sleepHours === "6-8 hours") score += 1;

    if (answers.stressLevel === "Highly stressed") score += 3;
    else if (answers.stressLevel === "Moderately stressed") score += 2;
    else if (answers.stressLevel === "Occasionally stressed") score += 1;

    if (answers.diet === "Skipping meals often") score += 3;
    else if (answers.diet === "Mostly junk food") score += 2;
    else if (answers.diet === "Rice & curry heavy") score += 1;

    if (answers.waterIntake === "I mostly drink tea/coffee") score += 2;
    else if (answers.waterIntake === "Less than 1 litre") score += 2;
    else if (answers.waterIntake === "1-2 litres") score += 1;

    if (answers.sunExposure === "All day outdoors") score += 2;
    else if (answers.sunExposure === "Outdoor work (3-5 hrs)") score += 1;

    if (answers.chemicalTreatment === "Multiple treatments") score += 3;
    else if (answers.chemicalTreatment === "Relaxers / Straightening")
      score += 2;
    else if (answers.chemicalTreatment === "Hair colouring") score += 1;

    if (score <= 4)
      return {
        level: "Low Risk",
        color: "#52B788",
        emoji: "🟢",
        advice: "Your lifestyle supports healthy hair. Maintain your routine!",
      };
    if (score <= 8)
      return {
        level: "Medium Risk",
        color: "#F4A261",
        emoji: "🟡",
        advice:
          "Some lifestyle factors may be causing hair loss. Consider changes.",
      };
    return {
      level: "High Risk",
      color: "#E63946",
      emoji: "🔴",
      advice: "Multiple risk factors detected. Consult a dermatologist soon.",
    };
  };

  const currentQ = questions[step];
  const isSelected = answers[currentQ?.key] !== "";
  const isLastStep = step === questions.length - 1;
  const isResult = step === questions.length;

  const goNext = () => {
    if (isLastStep) {
      setStep(step + 1); // show result
    } else {
      setStep(step + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const selectOption = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQ.key]: option }));
  };

  // Result Screen
  if (isResult) {
    const risk = calculateRisk();
    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultHeader}>
          <Text style={styles.logo}>🌿 TropiHair</Text>
          <Text style={styles.resultTitle}>Your Hair Loss Assessment</Text>
        </View>

        <View style={[styles.riskCard, { borderColor: risk.color }]}>
          <Text style={styles.riskEmoji}>{risk.emoji}</Text>
          <Text style={[styles.riskLevel, { color: risk.color }]}>
            {risk.level}
          </Text>
          <Text style={styles.riskAdvice}>{risk.advice}</Text>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>📋 Your Profile Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>😴 Sleep</Text>
            <Text style={styles.summaryValue}>{answers.sleepHours}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>😓 Stress</Text>
            <Text style={styles.summaryValue}>{answers.stressLevel}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>🍽️ Diet</Text>
            <Text style={styles.summaryValue}>{answers.diet}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>💧 Water</Text>
            <Text style={styles.summaryValue}>{answers.waterIntake}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>☀️ Sun</Text>
            <Text style={styles.summaryValue}>{answers.sunExposure}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>🧪 Chemicals</Text>
            <Text style={styles.summaryValue}>{answers.chemicalTreatment}</Text>
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Key Recommendations</Text>
          <Text style={styles.tip}>
            • Sleep 8 hours daily for hair regrowth
          </Text>
          <Text style={styles.tip}>
            • Manage stress with yoga or meditation
          </Text>
          <Text style={styles.tip}>
            • Drink 2L water daily for scalp health
          </Text>
          <Text style={styles.tip}>
            • Eat protein-rich foods (eggs, fish, lentils)
          </Text>
          <Text style={styles.tip}>• Use coconut oil 2-3x per week</Text>
          <Text style={styles.tip}>
            • Avoid heat styling and chemical treatments
          </Text>
          <Text style={styles.tip}>• Cover hair in strong Sri Lankan sun</Text>
        </View>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => navigation.replace("Home")}
        >
          <Text style={styles.homeBtnText}>🏠 Go to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌿 TropiHair</Text>
        <Text style={styles.headerSub}>Hair Loss Assessment</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((step + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.stepText}>
          {step + 1} / {questions.length}
        </Text>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionEmoji}>{currentQ.emoji}</Text>
        <Text style={styles.questionTitle}>{currentQ.title}</Text>
        <Text style={styles.questionSubtitle}>{currentQ.subtitle}</Text>

        {currentQ.options.map((option) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.optionBtn,
              answers[currentQ.key] === option.label && styles.optionSelected,
            ]}
            onPress={() => selectOption(option.label)}
          >
            <Text style={styles.optionEmoji}>{option.emoji}</Text>
            <View style={styles.optionContent}>
              <Text
                style={[
                  styles.optionLabel,
                  answers[currentQ.key] === option.label &&
                    styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
              <Text style={styles.optionDesc}>{option.desc}</Text>
            </View>
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
            {isLastStep ? "📊 See Results" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.replace("Home")}>
        <Text style={styles.skipText}>Skip assessment</Text>
      </TouchableOpacity>
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
  header: { alignItems: "center", marginBottom: 16 },
  logo: { fontSize: 24, fontWeight: "bold", color: "#52B788" },
  headerSub: { color: "#A8DADC", fontSize: 13, marginTop: 4 },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#1B2A3B",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#52B788",
    borderRadius: 4,
  },
  stepText: { color: "#A8DADC", fontSize: 12 },
  questionCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  questionEmoji: { fontSize: 36, textAlign: "center", marginBottom: 10 },
  questionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  questionSubtitle: {
    color: "#F4A261",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 16,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1B2A3B",
  },
  optionSelected: {
    borderColor: "#52B788",
    backgroundColor: "#52B78820",
  },
  optionEmoji: { fontSize: 22, marginRight: 12 },
  optionContent: { flex: 1 },
  optionLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  optionLabelSelected: { color: "#52B788" },
  optionDesc: { color: "#A8DADC", fontSize: 11, marginTop: 2 },
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
    marginBottom: 30,
  },
  // Result styles
  resultHeader: { alignItems: "center", marginBottom: 20 },
  resultTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  riskCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
  },
  riskEmoji: { fontSize: 48, marginBottom: 12 },
  riskLevel: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  riskAdvice: {
    color: "#A8DADC",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#0D1B2A",
  },
  summaryLabel: { color: "#A8DADC", fontSize: 13 },
  summaryValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  tipsCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  tipsTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tip: { color: "#A8DADC", fontSize: 13, marginBottom: 8, lineHeight: 20 },
  homeBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  homeBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
