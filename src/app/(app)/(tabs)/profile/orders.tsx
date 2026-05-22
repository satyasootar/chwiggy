import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_ORDERS, Order } from "../../../../data/mockData";

export default function MyOrdersScreen() {
  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order {item.id}</Text>
        <View style={[
          styles.statusBadge, 
          item.status === "Cancelled" && styles.statusBadgeCancelled,
          item.status === "Pending" && styles.statusBadgePending
        ]}>
          <Text style={[
            styles.statusText,
            item.status === "Cancelled" && styles.statusTextCancelled,
            item.status === "Pending" && styles.statusTextPending
          ]}>
            {item.status}
          </Text>
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
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Order History</Text>}
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
    padding: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
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
  statusBadgeCancelled: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  statusTextCancelled: {
    color: "#FF3B30",
  },
  statusBadgePending: {
    backgroundColor: "rgba(255, 122, 0, 0.1)",
  },
  statusTextPending: {
    color: "#FF7A00",
  },
  orderBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
    paddingRight: 12,
  },
  restaurantName: {
    color: "#FFFFFF",
    fontSize: 15,
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
    fontSize: 12,
  },
  orderTotal: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
