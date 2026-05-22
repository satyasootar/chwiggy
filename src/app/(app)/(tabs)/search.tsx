import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RESTAURANTS } from "../../../data/mockData";

const TRENDING = ["Biryani", "Pizza", "Sushi", "Healthy", "Burgers", "Vegan"];

const FOOD_CATEGORIES = [
  { id: "1", name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80" },
  { id: "2", name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" },
  { id: "3", name: "Dosa", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=300&q=80" },
  { id: "4", name: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80" },
  { id: "5", name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80" },
  { id: "6", name: "Desserts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80" },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Flatten all food items from all restaurants to enable global search
  const allFoodItems = useMemo(() => {
    return RESTAURANTS.flatMap((restaurant) => 
      restaurant.menu.map((food) => ({
        ...food,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allFoodItems.filter(
      (item) => item.name.toLowerCase().includes(query) || item.restaurantName.toLowerCase().includes(query)
    );
  }, [searchQuery, allFoodItems]);

  const handleSelectFood = (restaurantId: string) => {
    // If a user clicks a food search result, we take them to that restaurant's menu
    router.push({
      pathname: "/(app)/restaurant/[id]",
      params: { id: restaurantId },
    });
  };

  const renderTrending = ({ item }: { item: string }) => (
    <Pressable style={({ pressed }) => [styles.trendingPill, pressed && { opacity: 0.8 }]} onPress={() => setSearchQuery(item)}>
      <Ionicons name="trending-up" size={16} color="#FF7A00" style={{ marginRight: 6 }} />
      <Text style={styles.trendingText}>{item}</Text>
    </Pressable>
  );

  const renderCategoryCard = ({ item }: { item: typeof FOOD_CATEGORIES[0] }) => (
    <Pressable 
      style={({ pressed }) => [styles.categoryCard, pressed && { transform: [{ scale: 0.96 }] }]}
      onPress={() => setSearchQuery(item.name)}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.categoryImage} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.categoryOverlay}>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  const renderSearchResult = ({ item }: { item: typeof allFoodItems[0] }) => (
    <Pressable 
      style={({ pressed }) => [styles.searchResultCard, pressed && { opacity: 0.7 }]}
      onPress={() => handleSelectFood(item.restaurantId)}
    >
      <Image source={{ uri: item.image }} style={styles.searchResultImage} />
      <View style={styles.searchResultInfo}>
        <Text style={styles.searchResultName}>{item.name}</Text>
        <Text style={styles.searchResultRestaurant}>{item.restaurantName}</Text>
        <Text style={styles.searchResultPrice}>₹ {item.price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
    </Pressable>
  );

  const renderHeader = () => {
    if (searchQuery.trim().length > 0) return null;

    return (
      <View>
        <Text style={styles.sectionTitle}>Trending Searches</Text>
        <View style={styles.trendingContainer}>
          {TRENDING.map((item) => (
            <View key={item}>{renderTrending({ item })}</View>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Explore Categories</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for dishes, cuisines, or places..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={false}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")} style={styles.clearIcon}>
            <Ionicons name="close-circle" size={20} color="#8E8E93" />
          </Pressable>
        )}
      </View>

      {searchQuery.trim().length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#333333" style={{ marginBottom: 16 }} />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptySubtitle}>Try a different keyword or check for typos.</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={FOOD_CATEGORIES}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.rowWrapper}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#222222",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },
  clearIcon: {
    paddingLeft: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  trendingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  trendingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222222",
  },
  trendingText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  rowWrapper: {
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 16,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  categoryOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  categoryName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  searchResultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222222",
  },
  searchResultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  searchResultRestaurant: {
    color: "#8E8E93",
    fontSize: 13,
    marginBottom: 4,
  },
  searchResultPrice: {
    color: "#FFB000",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
  },
});
