import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [faceId, setFaceId] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Receive updates on your orders</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#333333", true: "#FF7A00" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingSubtitle}>For precise delivery tracking</Text>
            </View>
            <Switch
              value={location}
              onValueChange={setLocation}
              trackColor={{ false: "#333333", true: "#FF7A00" }}
              thumbColor={"#FFFFFF"}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Face ID / Biometrics</Text>
              <Text style={styles.settingSubtitle}>Secure fast checkout</Text>
            </View>
            <Switch
              value={faceId}
              onValueChange={setFaceId}
              trackColor={{ false: "#333333", true: "#FF7A00" }}
              thumbColor={"#FFFFFF"}
            />
          </View>

          <View style={styles.divider} />

          <Pressable style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <Pressable style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </Pressable>
        </View>

        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#222222",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#8E8E93",
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginLeft: 72,
  },
  versionText: {
    textAlign: "center",
    color: "#8E8E93",
    fontSize: 13,
    marginTop: 16,
  },
});
