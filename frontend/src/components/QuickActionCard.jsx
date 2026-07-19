import { Text, TouchableOpacity } from "react-native";

export default function QuickActionCard({ emoji, title, color }) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-2xl p-5 mx-1"
      style={{
        backgroundColor: color,
      }}
      activeOpacity={0.8}
    >
      <Text className="text-3xl">{emoji}</Text>

      <Text className="text-white font-bold text-lg mt-4">{title}</Text>
    </TouchableOpacity>
  );
}
