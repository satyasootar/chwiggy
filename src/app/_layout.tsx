import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";


function NavigationGuard() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    if (!hasCompletedOnboarding) {
      if (segments[1] !== "onboarding") {
        router.replace("/(auth)/onboarding");
      }
    } else if (!isAuthenticated) {
      if (segments[1] !== "login") {
        router.replace("/(auth)/login");
      }
    } else if (isAuthenticated) {
      // If the user is authenticated but not inside the authenticated app group (e.g., at the root screen),
      // programmatically transition them to the Home tab.
      if (!inAppGroup) {
        router.replace("/(app)/(tabs)/home");
      }
    }
  }, [isAuthenticated, isLoading, hasCompletedOnboarding, segments]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationGuard />
      </CartProvider>
    </AuthProvider>
  );
}
