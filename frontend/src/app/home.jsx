import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../constants/colors";
import { MENU_ITEMS as RAW_MENU_ITEMS } from "../constants/menuData";

// Dummy category chips — replace with GET /menu/categories later
const CATEGORIES = ["All", "Pizza", "Sides", "Beverages", "Desserts"];

// Map shared menu data to the fields this screen's card needs
const ICON_BG_BY_ID = {
  1: COLORS.primary,
  2: COLORS.secondary,
  3: COLORS.success,
  4: COLORS.danger,
};
const MENU_ITEMS = RAW_MENU_ITEMS.map((item) => ({
  id: item.id,
  name: item.name,
  subtitle: item.subtitle,
  price: item.basePrice,
  rating: item.rating,
  category: item.category,
  icon: item.icon,
  iconBg: ICON_BG_BY_ID[item.id] || COLORS.primary,
}));

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening, Prachi</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.gray} />
            <Text style={styles.locationText}>Jhansi, Uttar Pradesh</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={COLORS.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes e.g. Margherita, Garlic bread"
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category chips */}
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        style={styles.chipList}
        contentContainerStyle={styles.chipRow}
        renderItem={({ item }) => {
          const isActive = item === activeCategory;
          return (
            <TouchableOpacity
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActiveCategory(item)}
            >
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Menu items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Popular right now</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No dishes found</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/menu/${item.id}`)}
          >
            <View
              style={[styles.iconBox, { backgroundColor: item.iconBg + "22" }]}
            >
              <Ionicons name={item.icon} size={26} color={item.iconBg} />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>Rs {item.price}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={COLORS.secondary} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
  },
  chipList: {
    flexGrow: 0,
    maxHeight: 44,
    marginBottom: 16,
  },
  chipRow: {
    gap: 8,
    alignItems: "center",
  },
  chip: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "500",
  },
  chipTextActive: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 24,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginVertical: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
