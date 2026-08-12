import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Animated,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Your Gemini API key (AQ. auth-key format from Google AI Studio).
// If you switch to a standard "AIza..." key later, just paste it here.
const GEMINI_API_KEY = "AQ.Ab8RN6IpLwHmYve7HLHK1cvWpCfHQ6bppUp2VTQ2xUvuHvxGRw";

// Using "gemini-flash-latest" so it always points to a current model.
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

// The chatbot's personality / knowledge scope
const SYSTEM_CONTEXT = `You are TropiHair Assistant, a friendly hair and scalp care helper inside a Sri Lankan mobile app.
Only answer questions about hair care, scalp conditions, hair loss, and related wellness.
Keep answers short (2-4 sentences), practical, and mention Sri Lankan / tropical context where useful (humidity, coconut oil, neem, local foods).
Always remind users to see a dermatologist for serious or worsening conditions.
If asked something unrelated to hair/scalp, gently say you can only help with hair and scalp care.`;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm your TropiHair Assistant 🌿 Ask me anything about hair or scalp care!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Draggable floating button
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
    }),
  ).current;

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Build conversation for Gemini
      const contents = [
        { role: "user", parts: [{ text: SYSTEM_CONTEXT }] },
        {
          role: "model",
          parts: [{ text: "Understood. I'll help with hair and scalp care." }],
        },
        ...newMessages
          .filter((m) => m.role !== "bot" || newMessages.indexOf(m) !== 0)
          .map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
      ];

      // Current standard: pass the key in the "x-goog-api-key" header
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({ contents }),
      });

      const data = await response.json();

      // Log the REAL error to the terminal so we can see what went wrong
      if (!response.ok || data.error) {
        console.log("Gemini API error:", response.status, JSON.stringify(data));
      }

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't respond. Please try again.";

      setMessages((prev) => [...prev, { role: "bot", text: botReply.trim() }]);
    } catch (error) {
      console.log("ChatBot fetch failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Connection problem. Please check your internet and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <>
      {/* Floating draggable button */}
      <Animated.View
        style={[styles.floatingBtn, pan.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.floatingTouch}
          onPress={() => setOpen(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.floatingIcon}>💬</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Chat modal */}
      <Modal visible={open} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalWrap}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.chatBox}>
            {/* Header */}
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>🌿 TropiHair Assistant</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView
              ref={scrollRef}
              style={styles.messages}
              onContentSizeChange={() =>
                scrollRef.current?.scrollToEnd({ animated: true })
              }
            >
              {messages.map((msg, i) => (
                <View
                  key={i}
                  style={[
                    styles.bubble,
                    msg.role === "user" ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text
                    style={
                      msg.role === "user" ? styles.userText : styles.botText
                    }
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
              {loading && (
                <View style={[styles.bubble, styles.botBubble]}>
                  <ActivityIndicator color="#52B788" />
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Ask about hair or scalp care..."
                placeholderTextColor="#666"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={sendMessage}
                disabled={loading}
              >
                <Text style={styles.sendBtnText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: 90,
    right: 20,
    zIndex: 999,
  },
  floatingTouch: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#52B788",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingIcon: { fontSize: 26 },
  modalWrap: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chatBox: {
    backgroundColor: "#0D1B2A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "75%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1B2A3B",
  },
  chatTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold" },
  closeBtn: { color: "#A8DADC", fontSize: 20 },
  messages: { flex: 1, paddingVertical: 12 },
  bubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  userBubble: {
    backgroundColor: "#52B788",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#1B2A3B",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  userText: { color: "#FFFFFF", fontSize: 14, lineHeight: 19 },
  botText: { color: "#A8DADC", fontSize: 14, lineHeight: 19 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#1B2A3B",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#52B788",
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnText: { color: "#FFFFFF", fontSize: 18 },
});
