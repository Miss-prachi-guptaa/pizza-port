import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const SplashScreen = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // abhi Firebase decide kar raha hai, wait karo

    if (user) {
      // User already logged in hai — seedha home pe bhejo
      router.replace("/home");
    } else {
      // Koi session nahi mila — signup/login flow pe bhejo
      router.replace("/signup");
    }
  }, [loading, user]);

  return (
    <View style={styles.container}>
      {/* Apna app logo yahan daal sakti ho */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {loading && (
        <ActivityIndicator
          color={COLORS.secondary}
          size="large"
          style={styles.loader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 140,
  },
  loader: {
    marginTop: 24,
  },
});

export default SplashScreen;
