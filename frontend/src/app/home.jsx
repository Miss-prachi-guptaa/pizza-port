import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.log("Logout error:", err);
      Alert.alert("Error", "Logout mein dikkat aayi. Dobara try karo.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text className="text-2xl font-bold text-white mb-4">Home</Text>
        <View className="bg-slate-800 p-4 rounded-lg mb-4">
          <Text className="text-white text-base">
            Welcome to the Home Screen! This is a sample application built with
            React Native and Expo. You can navigate to different screens using
            the navigation menu.
          </Text>
          {user?.fullName ? (
            <Text className="text-gray-400 text-sm mt-3">
              Logged in as {user.fullName} ({user.email})
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-3 rounded-2xl"
        >
          <Text className="text-white text-center font-semibold text-base">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
