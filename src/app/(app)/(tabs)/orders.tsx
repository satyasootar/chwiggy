import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_ORDERS, Order } from "../../../data/mockData";

export default function OrdersScreen() {
  const activeOrders = MOCK_ORDERS.filter(o => o.status === "Pending" || o.status === "Delivered");

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order {item.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.orderBody}>
        <Image source={{ uri: item.image }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName} numberOfLines={1}>{item.restaurant}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderItems} numberOfLines={1}>{item.items}</Text>
        </View>
        <Text style={styles.orderTotal}>{item.total}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.orderFooter}>
        <Pressable style={styles.actionButtonSecondary}>
          <Text style={styles.actionButtonSecondaryText}>Rate</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.actionButtonPrimary, pressed && { opacity: 0.8 }]}>
          <Ionicons name="refresh" size={16} color="#111111" style={{ marginRight: 6 }} />
          <Text style={styles.actionButtonPrimaryText}>Reorder</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activeOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  listContent: {
    padding: 24,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#222222",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  orderId: {
    color: "#8E8E93",
    fontSize: 13,
    fontWeight: "600",
  },
  statusBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: "#4CAF50",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  orderBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
    paddingRight: 12,
  },
  restaurantName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  orderDate: {
    color: "#8E8E93",
    fontSize: 12,
    marginBottom: 4,
  },
  orderItems: {
    color: "#A0A0A0",
    fontSize: 13,
  },
  orderTotal: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginVertical: 16,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButtonSecondary: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonSecondaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonPrimary: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF7A00",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonPrimaryText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },
});
