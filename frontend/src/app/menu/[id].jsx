import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { MENU_ITEMS } from "../../constants/menuData";

export default function MenuItemDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = useMemo(
    () => MENU_ITEMS.find((menuItem) => menuItem.id === id),
    [id],
  );

  const [selectedSize, setSelectedSize] = useState(item?.sizes[0]?.label);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Item not found</Text>
      </SafeAreaView>
    );
  }

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((t) => t !== toppingId)
        : [...prev, toppingId],
    );
  };

  const sizePrice =
    item.sizes.find((s) => s.label === selectedSize)?.price || item.basePrice;
  const toppingsPrice = item.toppings
    .filter((t) => selectedToppings.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);
  const totalPrice = (sizePrice + toppingsPrice) * quantity;

  const handleAddItem = () => {
    // POST /cart/items goes here once API is wired
    const payload = {
      menuItemId: item.id,
      size: selectedSize,
      toppings: selectedToppings,
      instructions,
      quantity,
      totalPrice,
    };
    console.log("Add to cart payload:", payload);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Image placeholder */}
        <View style={styles.imagePlaceholder}>
          <Ionicons name={item.icon} size={56} color={COLORS.primary} />
        </View>

        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={COLORS.secondary} />
            <Text style={styles.ratingText}>
              {item.rating} ({item.ratingsCount})
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.price}>Rs {sizePrice}</Text>

        {/* Size selector */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose size</Text>
          <Text style={styles.sectionHint}>required</Text>
        </View>
        <View style={styles.sizeRow}>
          {item.sizes.map((size) => {
            const isActive = size.label === selectedSize;
            return (
              <TouchableOpacity
                key={size.label}
                style={[styles.sizeCard, isActive && styles.sizeCardActive]}
                onPress={() => setSelectedSize(size.label)}
              >
                <Text
                  style={[styles.sizeLabel, isActive && styles.sizeLabelActive]}
                >
                  {size.label}
                </Text>
                <Text
                  style={[styles.sizePrice, isActive && styles.sizeLabelActive]}
                >
                  Rs {size.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Toppings */}
        {item.toppings.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Add extra toppings</Text>
              <Text style={styles.sectionHint}>optional</Text>
            </View>
            <View style={styles.toppingsList}>
              {item.toppings.map((topping, index) => {
                const isChecked = selectedToppings.includes(topping.id);
                return (
                  <TouchableOpacity
                    key={topping.id}
                    style={[
                      styles.toppingRow,
                      index < item.toppings.length - 1 && styles.toppingDivider,
                    ]}
                    onPress={() => toggleTopping(topping.id)}
                  >
                    <Text style={styles.toppingLabel}>{topping.label}</Text>
                    <View style={styles.toppingRight}>
                      <Text style={styles.toppingPrice}>
                        +Rs {topping.price}
                      </Text>
                      <View
                        style={[
                          styles.checkbox,
                          isChecked && styles.checkboxChecked,
                        ]}
                      >
                        {isChecked && (
                          <Ionicons
                            name="checkmark"
                            size={13}
                            color={COLORS.white}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* Special instructions */}
        <Text style={styles.sectionTitle}>Special instructions</Text>
        <TextInput
          style={styles.instructionsInput}
          placeholder="e.g. less spicy, no onion"
          placeholderTextColor={COLORS.gray}
          value={instructions}
          onChangeText={setInstructions}
        />
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View style={styles.stepper}>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Ionicons name="remove" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
            <Ionicons name="add" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>Add item · Rs {totalPrice}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  notFoundText: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.white,
    flexShrink: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 8,
  },
  sectionHint: {
    fontSize: 12,
    color: COLORS.gray,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  sizeCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  sizeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "22",
  },
  sizeLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.white,
  },
  sizeLabelActive: {
    color: COLORS.primary,
  },
  sizePrice: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  toppingsList: {
    marginBottom: 18,
  },
  toppingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  toppingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  toppingLabel: {
    fontSize: 14,
    color: COLORS.white,
  },
  toppingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toppingPrice: {
    fontSize: 13,
    color: COLORS.gray,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  instructionsInput: {
    borderWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.white,
    fontSize: 13,
  },
  bottomBar: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  stepperValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  addButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
});
