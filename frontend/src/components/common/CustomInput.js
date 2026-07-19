import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

/**
 * Reusable labeled input, NativeWind version.
 * `prefix` shows a fixed non-editable bit inside the box (e.g. +91 — kept for future use).
 * `secureTextEntry` shows a password field with an eye toggle.
 */
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  prefix,
  maxLength,
  secureTextEntry = false,
  autoCapitalize = "sentences",
}) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View className="mb-5">
      <Text className="text-white text-sm font-medium mb-2">{label}</Text>
      <View className="flex-row items-center bg-background rounded-2xl px-4 h-[52px]">
        {prefix ? (
          <Text className="text-gray text-[15px] mr-1.5">{prefix}</Text>
        ) : null}
        <TextInput
          className="flex-1 text-white text-[15px]"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && hidden}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)}>
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
