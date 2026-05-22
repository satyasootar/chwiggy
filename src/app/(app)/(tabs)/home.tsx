import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";

import { Restaurant, RESTAURANTS } from "../../../data/mockData";

const CATEGORIES = ["All", "Indian", "Burgers", "Healthy", "Desserts", "Asian"];

export default function HomeScreen() {
  const router = useRouter();
  const { userName, userAvatar } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    router.push({
      pathname: "/(app)/restaurant/[id]",
      params: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        image: restaurant.image,
        time: restaurant.deliveryTime,
        cuisine: restaurant.cuisine,
      },
    });
  };

  const renderCategory = (item: string) => (
    <Pressable
      key={item}
      style={[
        styles.categoryPill,
        activeCategory === item && styles.categoryPillActive,
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item && styles.categoryTextActive,
        ]}
      >
        {item}
      </Text>
    </Pressable>
  );

  const renderRestaurantCard = ({ item }: { item: Restaurant }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => handleSelectRestaurant(item)}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.cardImage}>
        <View style={styles.cardImageOverlay}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
          <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
        </View>
      </ImageBackground>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardCuisine} numberOfLines={1}>{item.cuisine}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardTime}>⏱️ {item.deliveryTime}</Text>
        </View>
      </View>
    </Pressable>
  );

  const renderHeader = () => (
    <View>
      {/* Header Profile Row */}
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userAvatar || "https://ui-avatars.com/api/?name=User" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greetingText}>Good Evening</Text>
            <Text style={styles.userNameText}>{userName || "Ajmain Fayek"}</Text>
          </View>
        </View>
        <Pressable style={styles.bellIconContainer}>
          <Ionicons name="notifications" size={20} color="#FFFFFF" />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for dishes, cuisines, or places..."
          placeholderTextColor="#8E8E93"
        />
        <Pressable style={styles.filterIconContainer}>
          <Ionicons name="options-outline" size={20} color="#FF7A00" />
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map(renderCategory)}
      </ScrollView>

      {/* Flash Deal */}
      <Pressable style={({ pressed }) => [styles.flashDealContainer, pressed && { opacity: 0.9 }]}>
        <ImageBackground
          source={{ uri: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" }}
          style={styles.flashDealImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.flashDealOverlay}>
            <View style={styles.flashDealBadge}>
              <Text style={styles.flashDealBadgeText}>Flash Deal</Text>
            </View>
            <Text style={styles.flashDealTitle}>30% Off Premium Picks</Text>
            <Text style={styles.flashDealSubtitle}>Valid until midnight. Tap to claim.</Text>
          </View>
        </ImageBackground>
      </Pressable>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Curated for You</Text>
        <Pressable>
          <Text style={styles.seeAllText}>See all →</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={RESTAURANTS}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        numColumns={2}
        columnWrapperStyle={styles.rowWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  listContent: {
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 2,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bellIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF7A00",
    borderWidth: 2,
    borderColor: "#1C1C1E",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 30,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },
  filterIconContainer: {
    paddingLeft: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#1C1C1E",
  },
  categoryPillActive: {
    backgroundColor: "#FF7A00",
  },
  categoryText: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  flashDealContainer: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
  },
  flashDealImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  flashDealOverlay: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 16,
    height: "100%",
    justifyContent: "center",
  },
  flashDealBadge: {
    backgroundColor: "#FF7A00",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  flashDealBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  flashDealTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
    width: "70%",
  },
  flashDealSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  seeAllText: {
    fontSize: 14,
    color: "#FF7A00",
    fontWeight: "600",
  },
  rowWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    width: "48%",
    marginBottom: 16,
    overflow: "hidden",
  },
  cardPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  cardImage: {
    width: "100%",
    height: 130,
  },
  cardImageOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  ratingBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFB000",
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardCuisine: {
    fontSize: 11,
    color: "#8E8E93",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTime: {
    fontSize: 11,
    color: "#FF7A00",
    fontWeight: "600",
  },
  cardPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#FF7A00",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
