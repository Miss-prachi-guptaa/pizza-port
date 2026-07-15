import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import LogoAnimation from "../components/LogoAnimation";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      router.replace(user ? "/home" : "/login");
    }, 5000); // 5 sec splash

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <LogoAnimation />
    </View>
  );
}
