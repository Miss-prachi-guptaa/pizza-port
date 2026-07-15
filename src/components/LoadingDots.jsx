import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

function Dot({ delay }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 250 }),
          withTiming(0, { duration: 250 }),
        ),
        -1,
        false,
      );
    }, delay);
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 12,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 5,
          backgroundColor: "#F59E0B",
        },
        style,
      ]}
    />
  );
}

export default function LoadingDots() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 80,
        flexDirection: "row",
      }}
    >
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}
