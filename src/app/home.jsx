import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GreetingCard from "../components/GreetingCard";
import QuickActionCard from "../components/QuickActionCard";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <GreetingCard />

        <Text className="text-white text-2xl font-bold mt-8 mb-4">
          Quick Access
        </Text>

        <View className="flex-row">
          <QuickActionCard emoji="🏢" title="Companies" color="#2563EB" />

          <QuickActionCard emoji="💻" title="DSA" color="#7C3AED" />
        </View>

        <View className="flex-row mt-3">
          <QuickActionCard emoji="📚" title="GATE" color="#059669" />

          <QuickActionCard emoji="📝" title="Notes" color="#EA580C" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
