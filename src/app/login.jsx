import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      Alert.alert("Success", `Welcome ${userCredential.user.email}`);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#0F172A", "#1E293B", "#334155"]}
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 28,
          padding: 25,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontWeight: "700",
          }}
        >
          Welcome Back 👋
        </Text>

        <Text
          style={{
            color: "#CBD5E1",
            marginTop: 8,
            marginBottom: 35,
            fontSize: 16,
          }}
        >
          Login to continue
        </Text>

        {/* Email */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 15,
            paddingHorizontal: 15,
            marginBottom: 18,
          }}
        >
          <Ionicons name="mail-outline" size={22} color="white" />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={{
              flex: 1,
              color: "white",
              padding: 15,
            }}
          />
        </View>

        {/* Password */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.08)",
            borderRadius: 15,
            paddingHorizontal: 15,
          }}
        >
          <Ionicons name="lock-closed-outline" size={22} color="white" />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              flex: 1,
              color: "white",
              padding: 15,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            marginTop: 30,
            backgroundColor: "#6366F1",
            padding: 18,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          <Text
            style={{
              color: "#CBD5E1",
            }}
          >
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={() => router.replace("/signup")}>
            <Text
              style={{
                color: "#818CF8",
                marginLeft: 6,
                fontWeight: "700",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
