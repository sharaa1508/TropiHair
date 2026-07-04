import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function ScanScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan My Scalp</Text>
        <View />
      </View>

      {/* Instructions */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📋 How to get best results</Text>
        <Text style={styles.infoText}>
          • Good lighting — natural light best
        </Text>
        <Text style={styles.infoText}>• Part your hair to expose scalp</Text>
        <Text style={styles.infoText}>• Hold camera 10-15cm from scalp</Text>
        <Text style={styles.infoText}>• Keep camera steady, no blur</Text>
      </View>

      {/* Image Preview */}
      <View style={styles.previewBox}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
      </View>

      {/* Upload Buttons */}
      <TouchableOpacity style={styles.cameraBtn}>
        <Text style={styles.cameraBtnText}>📸 Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.galleryBtn}>
        <Text style={styles.galleryBtnText}>🖼️ Choose from Gallery</Text>
      </TouchableOpacity>

      {/* Analyze Button */}
      <TouchableOpacity
        style={styles.analyzeBtn}
        onPress={() => navigation.navigate("Results")}
      >
        <Text style={styles.analyzeBtnText}>🔍 Analyze Now</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        * This app is for informational purposes only. Always consult a
        dermatologist for medical advice.
      </Text>
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
    marginBottom: 24,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  infoCard: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: { color: "#A8DADC", fontSize: 13, marginBottom: 6 },
  previewBox: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  previewImage: { width: "100%", height: "100%" },
  placeholder: { alignItems: "center" },
  placeholderIcon: { fontSize: 48, marginBottom: 8 },
  placeholderText: { color: "#A8DADC", fontSize: 14 },
  cameraBtn: {
    backgroundColor: "#52B788",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  cameraBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  galleryBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#52B788",
  },
  galleryBtnText: { color: "#52B788", fontSize: 16, fontWeight: "bold" },
  analyzeBtn: {
    backgroundColor: "#F4A261",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  analyzeBtnText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  disclaimer: {
    color: "#666",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30,
  },
});
