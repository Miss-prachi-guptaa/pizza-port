import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle } from "../../utils/googleAuth";

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Alert.alert("Error", "Valid email daaliye");
      return false;
    }
    if (!password) {
      Alert.alert("Error", "Password daaliye");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;
      await login(token, user);
      router.replace("/home");
    } catch (err) {
      const message = err.response?.data?.message || "Login mein dikkat aayi. Dobara try karo.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { token, user } = await signInWithGoogle();
      await login(token, user);
      router.replace("/home");
    } catch (err) {
    console.error("Google Login Error:", err);

    console.log("Message:", err.response?.data?.message);
    console.log("Status:", err.response?.status);
    console.log("Full Error:", err.response?.data);

    Alert.alert(
      "Error",
      err.response?.data?.message || err.message
    );
  } finally {
    setGoogleLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow items-center justify-center py-10 px-4"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-gray text-sm mb-5">Login</Text>

        <View className="w-full max-w-[380px] bg-surface rounded-3xl p-6">
          <View className="items-center mb-6">
            <View className="w-[84px] h-[84px] rounded-full bg-background items-center justify-center mb-3">
              <Ionicons name="restaurant-outline" size={30} color={COLORS.primary} />
            </View>
            <Text className="text-white text-lg font-semibold">Welcome back</Text>
          </View>

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Apna password daaliye"
            secureTextEntry
            autoCapitalize="none"
          />

          <View className="h-2" />

          <CustomButton title="Login" onPress={handleLogin} loading={loading} />

          <TouchableOpacity onPress={() => router.replace("/signup")}>
            <Text className="text-gray text-center mt-4 text-[13px]">
              New here? <Text className="text-secondary font-semibold">Create account</Text>
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-5">
            <View className="flex-1 h-[1px] bg-gray/30" />
            <Text className="text-gray mx-3 text-xs">or</Text>
            <View className="flex-1 h-[1px] bg-gray/30" />
          </View>

          <CustomButton
            title="Continue with Google"
            variant="outline"
            onPress={handleGoogleLogin}
            loading={googleLoading}
            icon={<Ionicons name="logo-google" size={18} color={COLORS.white} />}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;