import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text } from "react-native";
import { useCart } from "../../../context/CartContext";

export default function TabsLayout() {
  const { cartCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF7A00", // Vibrant Orange brand color
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: true, // Let tabs show their headers
        headerStyle: {
          backgroundColor: "#111111",
          borderBottomWidth: 1,
          borderBottomColor: "#222222",
        },
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 20,
          color: "#FFFFFF",
        },
        tabBarStyle: {
          backgroundColor: "#111111",
          borderTopWidth: 1,
          borderTopColor: "#222222",
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          height: Platform.OS === "ios" ? 92 : 68,
        },
      }}
    >
      <Tabs.Screen
        name="home" // Points to the flat home screen
        options={{
          title: "Home",
          headerShown: false, // Home will manage its own custom top header!
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={24}
              color={color}
            />
          ),
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#FF7A00",
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false, // Profile has a custom Drawer layout
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
