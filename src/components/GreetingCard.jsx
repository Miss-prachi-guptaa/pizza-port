import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";

export default function GreetingCard() {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 17) greeting = "Good Afternoon 🌤️";

  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl p-6"
    >
      <Text className="text-white text-lg">{greeting}</Text>

      <Text className="text-white text-3xl font-bold mt-2">Prachi 👋</Text>

      <Text className="text-indigo-100 mt-4 text-base leading-6">
        Welcome back!
        {"\n"}
        Every small step today brings you closer to your dream offer 🚀
      </Text>
    </LinearGradient>
  );
}
