import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// ⚠️ IMPORTANT: Replace with YOUR laptop's WiFi IPv4 address
const API_URL = "http://192.168.8.100:8000";

export default function ScanScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Take photo with camera
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Needed",
        "Camera access is required to scan your scalp.",
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Pick photo from gallery
  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Needed", "Gallery access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Send image to API and analyze
  const handleAnalyze = async () => {
    if (!selectedImage) {
      Alert.alert("No Image", "Please take or choose a photo first.");
      return;
    }

    setLoading(true);
    try {
      // Build form data with the image file
      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage,
        name: "scalp.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Valid scalp condition - go to Results
        navigation.navigate("Results", {
          imageUri: selectedImage,
          result: data,
        });
      } else {
        // Poor quality / not scalp / low confidence
        Alert.alert("Cannot Analyze", data.message);
      }
    } catch (error) {
      console.log("Analyze error:", error);
      Alert.alert(
        "Connection Error",
        "Could not reach the analysis server. Make sure the server is running and your phone is on the same WiFi.",
      );
    } finally {
      setLoading(false);
    }
  };

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

      {/* Remove image */}
      {selectedImage && !loading && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setSelectedImage(null)}
        >
          <Text style={styles.clearBtnText}>✕ Remove Image</Text>
        </TouchableOpacity>
      )}

      {/* Upload Buttons */}
      <TouchableOpacity
        style={styles.cameraBtn}
        onPress={takePhoto}
        disabled={loading}
      >
        <Text style={styles.cameraBtnText}>📸 Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.galleryBtn}
        onPress={pickFromGallery}
        disabled={loading}
      >
        <Text style={styles.galleryBtnText}>🖼️ Choose from Gallery</Text>
      </TouchableOpacity>

      {/* Analyze Button */}
      <TouchableOpacity
        style={[styles.analyzeBtn, !selectedImage && styles.analyzeBtnDisabled]}
        onPress={handleAnalyze}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.analyzeBtnText}> Analyzing...</Text>
          </View>
        ) : (
          <Text style={styles.analyzeBtnText}>🔍 Analyze Now</Text>
        )}
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
    marginBottom: 12,
    overflow: "hidden",
  },
  previewImage: { width: "100%", height: "100%" },
  placeholder: { alignItems: "center" },
  placeholderIcon: { fontSize: 48, marginBottom: 8 },
  placeholderText: { color: "#A8DADC", fontSize: 14 },
  clearBtn: {
    alignSelf: "center",
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  clearBtnText: { color: "#E63946", fontSize: 13 },
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
  analyzeBtnDisabled: { backgroundColor: "#1B2A3B" },
  analyzeBtnText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  loadingRow: { flexDirection: "row", alignItems: "center" },
  disclaimer: {
    color: "#666",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30,
  },
});
