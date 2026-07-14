import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ScanScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Take photo with camera
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Needed",
        "Camera access is required to scan your scalp. Please enable it in settings.",
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
      Alert.alert(
        "Permission Needed",
        "Gallery access is required to select a photo.",
      );
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

  // Analyze - image venum
  const handleAnalyze = () => {
    if (!selectedImage) {
      Alert.alert(
        "No Image",
        "Please take a photo or choose one from your gallery first.",
      );
      return;
    }
    // Image uri-ai Results screen ku anuppurom (later API call add pannuvom)
    navigation.navigate("Results", { imageUri: selectedImage });
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

      {/* Retake option - image irundha mattum */}
      {selectedImage && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setSelectedImage(null)}
        >
          <Text style={styles.clearBtnText}>✕ Remove Image</Text>
        </TouchableOpacity>
      )}

      {/* Upload Buttons */}
      <TouchableOpacity style={styles.cameraBtn} onPress={takePhoto}>
        <Text style={styles.cameraBtnText}>📸 Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery}>
        <Text style={styles.galleryBtnText}>🖼️ Choose from Gallery</Text>
      </TouchableOpacity>

      {/* Analyze Button */}
      <TouchableOpacity
        style={[styles.analyzeBtn, !selectedImage && styles.analyzeBtnDisabled]}
        onPress={handleAnalyze}
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
  disclaimer: {
    color: "#666",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 30,
  },
});
