import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";

/**
 * variant="primary" -> solid orange button (Send OTP)
 * variant="outline" -> bordered transparent button (Continue with Google)
 */
const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  icon,
  loading,
  disabled,
}) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={`h-14 rounded-2xl flex-row items-center justify-center gap-2 ${
        isOutline ? "bg-transparent border border-gray/40" : "bg-primary"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <>
          {icon}
          <Text className="text-white text-base font-semibold">{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
