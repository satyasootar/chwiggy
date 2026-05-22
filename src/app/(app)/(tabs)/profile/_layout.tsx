import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../../context/AuthContext";

// 1. Custom Drawer Content Component (Renders Profile Card & Logout button)
function CustomDrawerContent(props: any) {
  const { userName, userAvatar, logout } = useAuth();

  const handleLogout = async () => {
    // Call the global logout which clears AsyncStorage
    await logout();
    // The NavigationGuard we built in Phase 3 will immediately detect
    // this state change and redirect the user back to the login screen!
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      {/* Upper Section: Avatar & Welcome Card */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: userAvatar || "https://ui-avatars.com/api/?name=User" }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName || "Hungry Foodie"}</Text>
        <Text style={styles.userMembership}>Gold Member 🏆</Text>
      </View>

      {/* Middle Section: Native Drawer Screen Items */}
      <View style={styles.drawerList}>
        <DrawerItemList {...props} />
      </View>

      {/* Bottom Section: Sleek Red Brand Logout Button */}
      <View style={styles.footerContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutPressed,
          ]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF7A00" />
          <Text style={styles.logoutText}>Log Out Session</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
}

// 2. Main Profile Drawer Layout component
export default function ProfileDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // Let drawer screens display their own top menu bar!
        headerTintColor: "#FF7A00", // Brand Orange Menu icon
        headerStyle: {
          backgroundColor: "#111111",
          borderBottomWidth: 1,
          borderBottomColor: "#222222",
        },
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 18,
          color: "#FFFFFF",
        },
        drawerActiveTintColor: "#FF7A00",
        drawerInactiveTintColor: "#8E8E93",
        drawerStyle: {
          backgroundColor: "#111111",
        },
        drawerLabelStyle: {
          fontWeight: "700",
          fontSize: 14,
          marginLeft: 0,
        },
      }}
    >
      {/* 4 nested screens inside the Drawer */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "My Profile",
          title: "My Profile",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: "My Orders",
          title: "My Orders",
          drawerIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: "Help & Support",
          title: "Help & Support",
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#111111",
  },
  profileHeader: {
    padding: 24,
    backgroundColor: "#1C1C1E",
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#FF7A00",
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userMembership: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF7A00",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  drawerList: {
    flex: 1,
    paddingTop: 16,
  },
  footerContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 122, 0, 0.1)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: "center",
  },
  logoutPressed: {
    opacity: 0.8,
  },
  logoutText: {
    color: "#FF7A00",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 10,
  },
});
