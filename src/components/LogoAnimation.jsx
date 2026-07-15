import { useEffect } from "react";
import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function LogoAnimation() {
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 120,
    });

    opacity.value = withTiming(1, {
      duration: 900,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <AnimatedImage
      source={require("../../assets/images/logo.png")}
      resizeMode="contain"
      className="w-72 h-72"
      style={animatedStyle}
    />
  );
}
