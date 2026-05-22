import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, cartCount } = useCart();

  const handleCheckout = () => {
    alert("🎉 Order placed successfully! Your food is on the way.");
    clearCart();
    router.replace("/(app)/(tabs)/home");
  };

  const deliveryFee = cartCount > 0 ? 40.00 : 0.00;
  const platformTax = cartCount > 0 ? 15.00 : 0.00;
  const finalTotal = cartTotal + deliveryFee + platformTax;

  const renderCartItem = ({ item }: { item: typeof cartItems[0] }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemRestaurant} numberOfLines={1}>{item.restaurantName}</Text>
        <Text style={styles.itemSubtitle}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>₹ {item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Your Cart ({cartCount})</Text>
        <View style={{ width: 40 }} />
      </View>

      {cartCount === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#333333" style={{ marginBottom: 20 }} />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse our list of popular restaurants and add yummy dishes here!
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.emptyButton,
              pressed && { transform: [{ scale: 0.96 }] }
            ]}
            onPress={() => router.replace("/(app)/(tabs)/home")}
          >
            <Text style={styles.emptyButtonText}>Explore Restaurants</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            contentContainerStyle={styles.itemList}
            showsVerticalScrollIndicator={false}
          />

          {/* Note Box */}
          <View style={styles.noteBox}>
            <View style={styles.noteHeader}>
              <Ionicons name="leaf" size={16} color="#4CAF50" />
              <Text style={styles.noteTitle}>Eco-Friendly Delivery</Text>
            </View>
            <Text style={styles.noteText}>
              Your order will be delivered using biodegradable packaging.
            </Text>
          </View>

          {/* Bill Details */}
          <View style={styles.receiptContainer}>
            <Text style={styles.receiptTitle}>Bill Details</Text>
            
            <View style={styles.receiptItem}>
              <Text style={styles.billLabel}>Subtotal</Text>
              <Text style={styles.billValue}>₹ {cartTotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.receiptItem}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>₹ {deliveryFee.toFixed(2)}</Text>
            </View>

            <View style={styles.receiptItem}>
              <Text style={styles.billLabel}>Platform Tax</Text>
              <Text style={styles.billValue}>₹ {platformTax.toFixed(2)}</Text>
            </View>
          </View>

          {/* Bottom Action Bar */}
          <View style={styles.bottomActionBar}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹ {finalTotal.toFixed(2)}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.checkoutButton,
                pressed && { transform: [{ scale: 0.96 }] }
              ]}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
              <Ionicons name="cart" size={18} color="#111111" style={{ marginLeft: 8 }} />
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  itemList: {
    paddingBottom: 24,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "600",
  },
  itemRestaurant: {
    fontSize: 12,
    color: "#FF7A00",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FF7A00",
  },
  noteBox: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(76, 175, 80, 0.2)",
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  noteTitle: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "700",
  },
  noteText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    lineHeight: 20,
  },
  receiptContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    paddingBottom: 12,
  },
  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "600",
  },
  billValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  bottomActionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "600",
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  checkoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF7A00",
    paddingHorizontal: 24,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    flex: 1.5,
  },
  checkoutButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyButton: {
    backgroundColor: "#FF7A00",
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "800",
  },
});
