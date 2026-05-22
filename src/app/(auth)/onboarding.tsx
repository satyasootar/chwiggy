import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function OnboardingScreen() {
    const { completeOnboarding } = useAuth();

    const handleGetStarted = async () => {
        await completeOnboarding();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Upper Content: Logo & Showcase Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.overlay} />
            </View>

            {/* Lower Content: Copywriting & Actions */}
            <View style={styles.contentContainer}>
                <Text style={styles.brandName}>Chwiggy</Text>

                <Text style={styles.title}>
                    Premium Food{"\n"}Delivered In Minutes
                </Text>

                <Text style={styles.subtitle}>
                    Satisfy your cravings with curated dishes from the finest local restaurants, delivered straight to your doorstep with lightning speed.
                </Text>

                {/* Brand Action Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleGetStarted}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    imageContainer: {
        flex: 5, // Takes up 50% of screen height
        position: "relative",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        // Generates a soft dark-to-light gradient overlay to let text pop
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    contentContainer: {
        flex: 5, // Takes up the other 50% of the screen
        paddingHorizontal: 28,
        paddingTop: 36,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "space-between",
    },
    brandName: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 3,
        color: "#FF6F61", // Sleek Coral/Orange brand color
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        textAlign: "center",
        color: "#1C1C1E", // Premium deep charcoal
        lineHeight: 40,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center",
        color: "#8E8E93", // Soft placeholder gray for description
        lineHeight: 24,
        paddingHorizontal: 12,
    },
    button: {
        width: "100%",
        backgroundColor: "#FF6F61",
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        // iOS Soft Shadow
        shadowColor: "#FF6F61",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        // Android Elevation
        elevation: 5,
        marginTop: 16,
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }], // Press down animation effect
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});
