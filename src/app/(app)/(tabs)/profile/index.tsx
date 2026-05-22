import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../../context/AuthContext";

export default function ProfileHomeScreen() {
  const { userName, userAvatar } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: userAvatar || "https://ui-avatars.com/api/?name=User" }}
            style={styles.avatar}
          />
          <Pressable style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="#111111" />
          </Pressable>
        </View>
        <Text style={styles.name}>{userName || "Hungry Foodie"}</Text>
        <View style={styles.membershipBadge}>
          <Ionicons name="star" size={12} color="#111111" style={{ marginRight: 4 }} />
          <Text style={styles.membershipText}>CHWIGGY ELITE</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Ionicons name="receipt-outline" size={24} color="#FF7A00" style={styles.statIcon} />
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="ticket-outline" size={24} color="#FF7A00" style={styles.statIcon} />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Coupons</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="wallet-outline" size={24} color="#FF7A00" style={styles.statIcon} />
          <Text style={styles.statNumber}>₹ 8.5K</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      
      <View style={styles.menuGroup}>
        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="person-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.menuText}>Personal Information</Text>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </Pressable>
        
        <View style={styles.divider} />
        
        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="location-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.menuText}>Saved Addresses</Text>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </Pressable>
        
        <View style={styles.divider} />
        
        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="card-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.menuText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>General</Text>
      
      <View style={styles.menuGroup}>
        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </Pressable>
        
        <View style={styles.divider} />
        
        <Pressable style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="help-circle-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FF7A00",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF7A00",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#111111",
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF7A00",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  membershipText: {
    fontSize: 11,
    color: "#111111",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222222",
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#222222",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginLeft: 72,
  },
});
