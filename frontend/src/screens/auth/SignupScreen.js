import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle } from "../../utils/googleAuth";

const SignupScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission chahiye", "Avatar set karne ke liye gallery access do.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const validate = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Full name daaliye");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Alert.alert("Error", "Valid email daaliye");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password kam se kam 6 characters ka hona chahiye");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        avatar, // NOTE: abhi local URI bhej rahe hain, actual upload feature baad mein banayenge
      });

      const { token, user } = response.data;
      await login(token, user);
      router.replace("/home");
    } catch (err) {
      const message = err.response?.data?.message || "Signup mein dikkat aayi. Dobara try karo.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const { token, user } = await signInWithGoogle();
      await login(token, user);
      router.replace("/home");
    } catch (err) {
      console.log("Google signup error:", err);
      Alert.alert("Error", "Google se signup mein dikkat aayi.");
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
        contentContainerClassName="flex-grow items-center py-10 px-4"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-gray text-sm mb-5">1. Sigp</Text>
        
        

        <View className="w-full max-w-[380px] bg-surface rounded-3xl p-6">
          <TouchableOpacity className="self-center mb-3" onPress={pickAvatar}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                className="w-[84px] h-[84px] rounded-full"
              />
            ) : (
              <View className="w-[84px] h-[84px] rounded-full bg-background items-center justify-center">
                <Ionicons name="camera-outline" size={26} color={COLORS.gray} />
              </View>
            )}
          </TouchableOpacity>
          <View className="w-[90px] h-2 rounded-full bg-background self-center mb-6" />

          <CustomInput
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Apna naam likhiye"
          />

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
            placeholder="Kam se kam 6 characters"
            secureTextEntry
            autoCapitalize="none"
          />

          <View className="h-2" />

          <CustomButton title="Sign Up" onPress={handleSignup} loading={loading} />

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-gray text-center mt-4 text-[13px]">
              Already have an account? <Text className="text-secondary font-semibold">Login</Text>
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
            onPress={handleGoogleSignup}
            loading={googleLoading}
            icon={<Ionicons name="logo-google" size={18} color={COLORS.white} />}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;