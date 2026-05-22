import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCart } from "../../../context/CartContext";
import { FoodItem, RESTAURANTS } from "../../../data/mockData";

export default function RestaurantDetailScreen() {
  const { id, name, rating, image, time, cuisine } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addToCart, cartTotal, cartCount, cartItems, removeFromCart } = useCart();

  // Find the restaurant in our mock data
  const restaurant = RESTAURANTS.find((r) => r.id === id);
  const menu = restaurant?.menu || [];

  // Fallback data for UI if accessed directly
  const displayId = (id as string) || "101";
  const displayName = (name as string) || restaurant?.name || "Restaurant";
  const displayRating = (rating as string) || restaurant?.rating || "4.5";
  const displayImage = (image as string) || restaurant?.image || "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80";
  const displayTime = (time as string) || restaurant?.deliveryTime || "20-30 min";
  const displayCuisine = (cuisine as string) || restaurant?.cuisine || "Cuisine";

  const renderFoodItem = ({ item }: { item: FoodItem }) => {
    const cartItem = cartItems.find((c) => c.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
      <View style={styles.foodItemCard}>
        <View style={styles.foodItemInfo}>
          <View style={styles.foodItemHeader}>
            <View style={[styles.vegBadge, item.isVeg ? styles.vegGreen : styles.vegRed]}>
              <View style={[styles.vegDot, item.isVeg ? styles.vegDotGreen : styles.vegDotRed]} />
            </View>
            <Text style={styles.foodItemName}>{item.name}</Text>
          </View>
          <Text style={styles.foodItemPrice}>₹ {item.price}</Text>
          <Text style={styles.foodItemDescription} numberOfLines={2}>{item.description}</Text>
        </View>
        <View style={styles.foodItemImageContainer}>
          <Image source={{ uri: item.image }} style={styles.foodItemImage} />
          {quantity > 0 ? (
            <View style={styles.quantitySelector}>
              <Pressable style={styles.qtyBtn} onPress={() => removeFromCart(item.id)}>
                <Ionicons name="remove" size={16} color="#FFFFFF" />
              </Pressable>
              <Text style={styles.qtyText}>{quantity}</Text>
              <Pressable 
                style={styles.qtyBtn} 
                onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, restaurantName: displayName })}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <Pressable 
              style={styles.addButton}
              onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, restaurantName: displayName })}
            >
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View>
      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: displayImage }}
          style={styles.heroImage}
        />
        
        {/* Floating Header Actions */}
        <View style={[styles.floatingHeader, { top: insets.top + 10 }]}>
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </Pressable>
          <View style={styles.headerRightActions}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="search" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable style={[styles.iconButton, { marginLeft: 12 }]}>
              <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.titleText}>{displayName}</Text>
        <Text style={styles.cuisineText}>{displayCuisine}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>⭐ {displayRating} ({Math.floor(parseInt(displayId || "101") * 3.14) % 2000 + 100} reviews)</Text>
          </View>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>⏱️ {displayTime}</Text>
          </View>
        </View>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Menu</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={menu}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: cartCount > 0 ? 120 : 40 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating View Cart Bar */}
      {cartCount > 0 && (
        <View style={[styles.bottomActionBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartCountText}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</Text>
            <Text style={styles.cartTotalText}>₹ {cartTotal}</Text>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.viewCartButton,
              pressed && { transform: [{ scale: 0.96 }] }
            ]}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="cart" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  floatingHeader: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRightActions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    paddingBottom: 0,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 4,
  },
  cuisineText: {
    color: "#8E8E93",
    fontSize: 14,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
  },
  metaBadge: {
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  metaBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginVertical: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  foodItemCard: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 32,
    justifyContent: "space-between",
  },
  foodItemInfo: {
    flex: 1,
    paddingRight: 16,
  },
  foodItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  vegGreen: {
    borderColor: "#4CAF50",
  },
  vegRed: {
    borderColor: "#FF3B30",
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  vegDotGreen: {
    backgroundColor: "#4CAF50",
  },
  vegDotRed: {
    backgroundColor: "#FF3B30",
  },
  foodItemName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  foodItemPrice: {
    color: "#FFB000",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  foodItemDescription: {
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 18,
  },
  foodItemImageContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  foodItemImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#FF7A00",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  addButtonText: {
    color: "#FF7A00",
    fontWeight: "800",
    fontSize: 14,
  },
  quantitySelector: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "#FF7A00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 90,
    height: 36,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  qtyBtn: {
    width: 30,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    color: "#111111",
    fontWeight: "800",
    fontSize: 14,
  },
  bottomActionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1C1C1E",
    borderTopWidth: 1,
    borderTopColor: "#222222",
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartInfo: {
    flex: 1,
  },
  cartCountText: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cartTotalText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  viewCartButton: {
    backgroundColor: "#FF7A00",
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewCartText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },
});
