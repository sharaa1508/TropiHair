import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    // Firebase Auth later connect pannuvom
    navigation.replace("Onboarding");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>🌿</Text>
          <Text style={styles.appName}>TropiHair</Text>
          <Text style={styles.tagline}>Smart Scalp & Hair Care</Text>
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.tabActive]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.tabActive]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {isLogin ? "👋 Welcome Back!" : "🌿 Create Account"}
          </Text>
          <Text style={styles.formSubtitle}>
            {isLogin
              ? "Login to continue your hair care journey"
              : "Join TropiHair for personalized hair care"}
          </Text>

          {/* Name field (signup only) */}
          {!isLogin && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showBtn}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          {isLogin && (
            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>
              {isLogin ? "🚀 Login" : "✅ Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity style={styles.googleBtn}>
            <Text style={styles.googleBtnText}>🔵 Continue with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Switch mode */}
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity onPress={() => navigation.replace("Onboarding")}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1B2A" },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  logoSection: { alignItems: "center", marginBottom: 30 },
  logo: { fontSize: 56, marginBottom: 8 },
  appName: { fontSize: 32, fontWeight: "bold", color: "#52B788" },
  tagline: { fontSize: 13, color: "#A8DADC", marginTop: 4 },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#1B2A3B",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: { backgroundColor: "#52B788" },
  tabText: { color: "#A8DADC", fontSize: 15, fontWeight: "bold" },
  tabTextActive: { color: "#FFFFFF" },
  formCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  formTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  formSubtitle: {
    color: "#A8DADC",
    fontSize: 13,
    marginBottom: 24,
  },
  inputGroup: { marginBottom: 16 },
  inputLabel: { color: "#A8DADC", fontSize: 13, marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1B2A",
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#2A3F52",
  },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 14,
  },
  showBtn: { fontSize: 18, padding: 4 },
  forgotRow: { alignItems: "flex-end", marginBottom: 20 },
  forgotText: { color: "#52B788", fontSize: 13 },
  submitBtn: {
    backgroundColor: "#52B788",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  submitBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#2A3F52" },
  dividerText: { color: "#666", fontSize: 13, marginHorizontal: 12 },
  googleBtn: {
    backgroundColor: "#0D1B2A",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A3F52",
  },
  googleBtnText: { color: "#FFFFFF", fontSize: 15 },
  switchText: {
    color: "#52B788",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  skipText: {
    color: "#666",
    fontSize: 13,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
