import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAQS = [
  {
    id: "1",
    question: "Where is my order?",
    answer: "You can track your order in real-time by going to the 'Orders' tab and selecting your active order. It will show the delivery partner's location.",
  },
  {
    id: "2",
    question: "How do I cancel my order?",
    answer: "You can cancel your order within 60 seconds of placing it. After the restaurant starts preparing your food, cancellation is no longer possible.",
  },
  {
    id: "3",
    question: "I received the wrong item. What do I do?",
    answer: "We apologize for the mix-up! Please use the 'Chat with Support' option below and share a photo of the item you received. We'll issue a refund or replacement immediately.",
  },
  {
    id: "4",
    question: "How do I apply a promo code?",
    answer: "During checkout, tap on the 'Apply Coupon' button above the final bill details to enter your promo code.",
  },
];

export default function HelpSupportScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Contact Options */}
        <View style={styles.contactGrid}>
          <Pressable style={({ pressed }) => [styles.contactCard, pressed && { opacity: 0.8 }]}>
            <View style={[styles.iconCircle, { backgroundColor: "rgba(255, 122, 0, 0.1)" }]}>
              <Ionicons name="chatbubbles" size={28} color="#FF7A00" />
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSubtitle}>Typically replies in 2m</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.contactCard, pressed && { opacity: 0.8 }]}>
            <View style={[styles.iconCircle, { backgroundColor: "rgba(76, 175, 80, 0.1)" }]}>
              <Ionicons name="call" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactSubtitle}>Available 24/7</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <View style={styles.faqContainer}>
          {FAQS.map((faq, index) => {
            const isExpanded = expandedId === faq.id;
            return (
              <View key={faq.id}>
                <Pressable 
                  style={styles.faqHeader} 
                  onPress={() => toggleExpand(faq.id)}
                >
                  <Text style={[styles.faqQuestion, isExpanded && styles.faqQuestionActive]}>
                    {faq.question}
                  </Text>
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={isExpanded ? "#FF7A00" : "#8E8E93"} 
                  />
                </Pressable>
                
                {isExpanded && (
                  <View style={styles.faqBody}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}

                {index < FAQS.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

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
  contactGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  contactCard: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222222",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  faqContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222222",
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    paddingRight: 16,
  },
  faqQuestionActive: {
    color: "#FF7A00",
  },
  faqBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#222222",
    marginHorizontal: 20,
  },
});
