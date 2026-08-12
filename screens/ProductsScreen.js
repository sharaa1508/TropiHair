import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";

// Product catalogue - hair & scalp care items available in Sri Lanka.
// "buyUrl" opens a Daraz search so the link always works.
const PRODUCTS = [
  {
    name: "Coconut Oil (Virgin)",
    category: "Oils",
    emoji: "🥥",
    price: "Rs. 450",
    desc: "Cold-pressed virgin coconut oil for scalp massage and moisture.",
    goodFor: "All scalp types, dry scalp",
    buyUrl: "https://www.daraz.lk/catalog/?q=virgin+coconut+oil+hair",
  },
  {
    name: "Neem Oil",
    category: "Oils",
    emoji: "🍃",
    price: "Rs. 650",
    desc: "Natural antibacterial and antifungal oil for folliculitis and dandruff.",
    goodFor: "Folliculitis, Seborrheic Dermatitis",
    buyUrl: "https://www.daraz.lk/catalog/?q=neem+oil+hair",
  },
  {
    name: "Tea Tree Oil",
    category: "Oils",
    emoji: "🌱",
    price: "Rs. 890",
    desc: "Antimicrobial essential oil - dilute before applying to the scalp.",
    goodFor: "Fungal conditions, itchy scalp",
    buyUrl: "https://www.daraz.lk/catalog/?q=tea+tree+oil",
  },
  {
    name: "Anti-Dandruff Shampoo",
    category: "Shampoo",
    emoji: "🧴",
    price: "Rs. 750",
    desc: "Ketoconazole-based medicated shampoo for flaky, itchy scalp.",
    goodFor: "Seborrheic Dermatitis, dandruff",
    buyUrl: "https://www.daraz.lk/catalog/?q=anti+dandruff+shampoo",
  },
  {
    name: "Mild Sulphate-Free Shampoo",
    category: "Shampoo",
    emoji: "🧴",
    price: "Rs. 980",
    desc: "Gentle daily shampoo that won't strip natural scalp oils.",
    goodFor: "Sensitive scalp, daily use",
    buyUrl: "https://www.daraz.lk/catalog/?q=sulfate+free+shampoo",
  },
  {
    name: "Aloe Vera Gel",
    category: "Treatment",
    emoji: "🌵",
    price: "Rs. 550",
    desc: "Soothing gel to calm inflammation and irritation on the scalp.",
    goodFor: "Psoriasis, irritated scalp",
    buyUrl: "https://www.daraz.lk/catalog/?q=aloe+vera+gel",
  },
  {
    name: "Fenugreek Powder",
    category: "Treatment",
    emoji: "🌾",
    price: "Rs. 320",
    desc: "Traditional hair pack ingredient for flaking and hair strength.",
    goodFor: "Dandruff, weak hair",
    buyUrl: "https://www.daraz.lk/catalog/?q=fenugreek+powder",
  },
  {
    name: "Fine Nit Comb",
    category: "Tools",
    emoji: "🪮",
    price: "Rs. 180",
    desc: "Fine-toothed comb for removing head lice and nits.",
    goodFor: "Head Lice",
    buyUrl: "https://www.daraz.lk/catalog/?q=nit+comb+lice",
  },
  {
    name: "Scalp Massager Brush",
    category: "Tools",
    emoji: "💆",
    price: "Rs. 390",
    desc: "Silicone brush to improve circulation and spread oil evenly.",
    goodFor: "All scalp types",
    buyUrl: "https://www.daraz.lk/catalog/?q=scalp+massager+brush",
  },
];

const CATEGORIES = ["All", "Oils", "Shampoo", "Treatment", "Tools"];

export default function ProductsScreen({ navigation }) {
  const [category, setCategory] = useState("All");

  const filtered =
    category === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  const openBuyLink = async (url, name) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Cannot open link",
          `Search for "${name}" on Daraz or Amazon.`,
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not open the store link.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Shop Products</Text>
        <View />
      </View>

      <Text style={styles.subtitle}>
        Hair & scalp care products available in Sri Lanka
      </Text>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, category === cat && styles.catActive]}
            onPress={() => setCategory(cat)}
          >
            <Text
              style={[styles.catText, category === cat && styles.catTextActive]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product list */}
      {filtered.map((product, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.productEmoji}>{product.emoji}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          </View>
          <Text style={styles.productDesc}>{product.desc}</Text>
          <View style={styles.goodForRow}>
            <Text style={styles.goodForLabel}>Good for: </Text>
            <Text style={styles.goodForText}>{product.goodFor}</Text>
          </View>
          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => openBuyLink(product.buyUrl, product.name)}
          >
            <Text style={styles.buyBtnText}>🛒 Buy on Daraz</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.disclaimer}>
        * Prices are approximate. Links open Daraz search results. TropiHair is
        not affiliated with any seller.
      </Text>
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
    marginBottom: 8,
  },
  backBtn: { color: "#52B788", fontSize: 16 },
  title: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  subtitle: {
    color: "#A8DADC",
    fontSize: 13,
    marginBottom: 16,
    textAlign: "center",
  },
  catRow: { marginBottom: 16 },
  catBtn: {
    backgroundColor: "#1B2A3B",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#2A3F52",
    height: 38,
  },
  catActive: { backgroundColor: "#52B788", borderColor: "#52B788" },
  catText: { color: "#A8DADC", fontSize: 13 },
  catTextActive: { color: "#FFFFFF", fontWeight: "bold" },
  card: {
    backgroundColor: "#1B2A3B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardTop: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  productEmoji: { fontSize: 36, marginRight: 14 },
  cardInfo: { flex: 1 },
  productName: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  productPrice: {
    color: "#52B788",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 2,
  },
  productDesc: {
    color: "#A8DADC",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  goodForRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  goodForLabel: { color: "#52B788", fontSize: 12, fontWeight: "bold" },
  goodForText: { color: "#A8DADC", fontSize: 12, flex: 1 },
  buyBtn: {
    backgroundColor: "#F4A261",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  buyBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  disclaimer: {
    color: "#666",
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 16,
  },
});
