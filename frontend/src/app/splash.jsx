import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#1F2937",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 180,
          height: 180,
          resizeMode: "contain",
        }}
      />

      <Text
        style={{
          color: "#F8F3EA",
          fontSize: 34,
          fontWeight: "800",
          marginTop: 30,
          letterSpacing: 2,
        }}
      >
        PIZZA PORT
      </Text>

      <Text
        style={{
          color: "#C7C7C7",
          marginTop: 10,
          fontSize: 16,
          letterSpacing: 1,
        }}
      >
        Fresh • Fast • Delicious
      </Text>
    </SafeAreaView>
  );
}
