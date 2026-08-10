import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  mint: "#41B39E",
  mintStrong: "#2E8F7D",
  mintSoft: "#D9F0EC",
  paper: "#FFFFFF",
  charcoal: "#23262B",
  darkGrey: "#5B5F63",
  faint: "#8A8E92",
  line: "#E7E5E1",
  red: "#EA1D48",
  sunshine: "#FFC75A",
  softBackground: "#F7F7F4",
};

type Brand = {
  id: number;
  name: string;
  category: string;
  active: boolean;
  visible: boolean;
  countries: number;
  products: number;
  contracts: number;
  photoCount: number;
};

const INITIAL_BRANDS: Brand[] = [
  {
    id: 1,
    name: "Heineken",
    category: "Beer",
    active: true,
    visible: true,
    countries: 32,
    products: 4,
    contracts: 3,
    photoCount: 125642,
  },
  {
    id: 2,
    name: "Guinness",
    category: "Beer",
    active: true,
    visible: true,
    countries: 18,
    products: 3,
    contracts: 2,
    photoCount: 84610,
  },
  {
    id: 3,
    name: "Corona",
    category: "Beer",
    active: true,
    visible: true,
    countries: 24,
    products: 5,
    contracts: 1,
    photoCount: 73214,
  },
  {
    id: 4,
    name: "Grolsch",
    category: "Beer",
    active: true,
    visible: false,
    countries: 9,
    products: 2,
    contracts: 0,
    photoCount: 21444,
  },
  {
    id: 5,
    name: "Windhoek",
    category: "Beer",
    active: false,
    visible: false,
    countries: 6,
    products: 3,
    contracts: 0,
    photoCount: 10291,
  },
];

export default function BrandsScreen() {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [search, setSearch] = useState("");

  const visibleBrands = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return brands;

    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(value) ||
        brand.category.toLowerCase().includes(value)
    );
  }, [brands, search]);

  const toggleActive = (id: number) => {
    setBrands((current) =>
      current.map((brand) =>
        brand.id === id
          ? { ...brand, active: !brand.active }
          : brand
      )
    );
  };

  const toggleVisible = (id: number) => {
    setBrands((current) =>
      current.map((brand) =>
        brand.id === id
          ? { ...brand, visible: !brand.visible }
          : brand
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.charcoal}
            />
          </Pressable>

          <View style={styles.headerTitleBlock}>
            <Text style={styles.eyebrow}>ADMIN</Text>
            <Text style={styles.title}>Brands</Text>
            <Text style={styles.subtitle}>
              Manage drink brands and visibility
            </Text>
          </View>

          <Pressable style={styles.menuButton}>
            <Ionicons
              name="menu"
              size={23}
              color={COLORS.charcoal}
            />
          </Pressable>
        </View>

        {/* SEARCH */}

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={20}
            color={COLORS.faint}
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search brands"
            placeholderTextColor={COLORS.faint}
            style={styles.searchInput}
            autoCorrect={false}
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={19}
                color={COLORS.faint}
              />
            </Pressable>
          )}
        </View>

        {/* SUMMARY */}

        <View style={styles.summaryRow}>
          <SummaryCard
            label="Brands"
            value={brands.length.toString()}
          />

          <SummaryCard
            label="Active"
            value={brands
              .filter((brand) => brand.active)
              .length.toString()}
          />

          <SummaryCard
            label="Visible"
            value={brands
              .filter((brand) => brand.visible)
              .length.toString()}
          />
        </View>

        {/* ADD BRAND */}

        <Pressable style={styles.addBrandButton}>
          <Ionicons
            name="add"
            size={20}
            color={COLORS.paper}
          />

          <Text style={styles.addBrandText}>
            Add Brand
          </Text>
        </Pressable>

        {/* LIST HEADING */}

        <View style={styles.listHeading}>
          <View>
            <Text style={styles.listTitle}>
              Brand Management
            </Text>

            <Text style={styles.listCopy}>
              {visibleBrands.length} brands shown
            </Text>
          </View>

          <Pressable style={styles.filterButton}>
            <Ionicons
              name="options-outline"
              size={18}
              color={COLORS.charcoal}
            />
          </Pressable>
        </View>

        {/* BRAND LIST */}

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {visibleBrands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onToggleActive={() =>
                toggleActive(brand.id)
              }
              onToggleVisible={() =>
                toggleVisible(brand.id)
              }
            />
          ))}

          {visibleBrands.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="pricetag-outline"
                size={30}
                color={COLORS.mintStrong}
              />

              <Text style={styles.emptyTitle}>
                No brands found
              </Text>

              <Text style={styles.emptyCopy}>
                Try another search.
              </Text>
            </View>
          )}

          <View style={{ height: 28 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>
        {value}
      </Text>

      <Text style={styles.summaryLabel}>
        {label}
      </Text>
    </View>
  );
}

function BrandCard({
  brand,
  onToggleActive,
  onToggleVisible,
}: {
  brand: Brand;
  onToggleActive: () => void;
  onToggleVisible: () => void;
}) {
  return (
    <View style={styles.brandCard}>
      <View style={styles.brandTop}>
        <View style={styles.brandArtwork}>
          <Ionicons
            name="beer-outline"
            size={26}
            color={COLORS.mintStrong}
          />
        </View>

        <View style={styles.brandInfo}>
          <View style={styles.brandNameRow}>
            <Text style={styles.brandName}>
              {brand.name}
            </Text>

            <View
              style={[
                styles.statusPill,
                brand.active
                  ? styles.statusPillActive
                  : styles.statusPillInactive,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: brand.active
                      ? COLORS.mint
                      : COLORS.faint,
                  },
                ]}
              />

              <Text
                style={[
                  styles.statusText,
                  {
                    color: brand.active
                      ? COLORS.mintStrong
                      : COLORS.darkGrey,
                  },
                ]}
              >
                {brand.active
                  ? "ACTIVE"
                  : "INACTIVE"}
              </Text>
            </View>
          </View>

          <Text style={styles.brandCategory}>
            {brand.category}
          </Text>
        </View>

        <Pressable style={styles.editButton}>
          <Ionicons
            name="create-outline"
            size={19}
            color={COLORS.charcoal}
          />
        </Pressable>
      </View>

      {/* METRICS */}

      <View style={styles.metricsRow}>
        <Metric
          label="Photos"
          value={brand.photoCount.toLocaleString()}
        />

        <Metric
          label="Products"
          value={brand.products.toString()}
        />

        <Metric
          label="Countries"
          value={brand.countries.toString()}
        />

        <Metric
          label="Contracts"
          value={brand.contracts.toString()}
        />
      </View>

      {/* CONTROLS */}

      <View style={styles.controlsRow}>
        <View style={styles.controlBlock}>
          <View>
            <Text style={styles.controlTitle}>
              Active
            </Text>

            <Text style={styles.controlCopy}>
              Brand available for use
            </Text>
          </View>

          <Toggle
            value={brand.active}
            onPress={onToggleActive}
          />
        </View>

        <View style={styles.controlDivider} />

        <View style={styles.controlBlock}>
          <View>
            <Text style={styles.controlTitle}>
              Visible
            </Text>

            <Text style={styles.controlCopy}>
              Show brand in app
            </Text>
          </View>

          <Toggle
            value={brand.visible}
            onPress={onToggleVisible}
          />
        </View>
      </View>

      {/* CONTRACT */}

      <Pressable style={styles.contractRow}>
        <View style={styles.contractIcon}>
          <Ionicons
            name="document-text-outline"
            size={17}
            color={COLORS.mintStrong}
          />
        </View>

        <View style={styles.contractInfo}>
          <Text style={styles.contractTitle}>
            {brand.contracts > 0
              ? `${brand.contracts} active ${
                  brand.contracts === 1
                    ? "contract"
                    : "contracts"
                }`
              : "No active contracts"}
          </Text>

          <Text style={styles.contractCopy}>
            Country and billing visibility
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={COLORS.faint}
        />
      </Pressable>
    </View>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>
        {value}
      </Text>

      <Text style={styles.metricLabel}>
        {label}
      </Text>
    </View>
  );
}

function Toggle({
  value,
  onPress,
}: {
  value: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.toggle,
        value && styles.toggleOn,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.toggleKnob,
          value && styles.toggleKnobOn,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitleBlock: {
    flex: 1,
    marginLeft: 12,
  },

  eyebrow: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.2,
    color: COLORS.mintStrong,
  },

  title: {
    marginTop: 1,
    fontFamily: "DMSans_700Bold",
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.9,
    color: COLORS.charcoal,
  },

  subtitle: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 10.5,
    color: COLORS.darkGrey,
  },

  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    height: 49,
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 14,
    backgroundColor: COLORS.softBackground,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: COLORS.charcoal,
  },

  summaryRow: {
    marginHorizontal: 20,
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
  },

  summaryCard: {
    flex: 1,
    minHeight: 64,
    borderRadius: 16,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryValue: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: COLORS.charcoal,
  },

  summaryLabel: {
    marginTop: 1,
    fontFamily: "DMSans_500Medium",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  addBrandButton: {
    height: 46,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 23,
    backgroundColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  addBrandText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 11,
    letterSpacing: 0.2,
    color: COLORS.paper,
  },

  listHeading: {
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
    color: COLORS.charcoal,
  },

  listCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
  },

  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 20,
  },

  brandCard: {
    marginBottom: 12,
    padding: 14,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.paper,
  },

  brandTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  brandArtwork: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  brandInfo: {
    flex: 1,
    marginLeft: 11,
  },

  brandNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  brandName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  brandCategory: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9.5,
    color: COLORS.darkGrey,
  },

  statusPill: {
    height: 19,
    marginLeft: 7,
    paddingHorizontal: 7,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  statusPillActive: {
    backgroundColor: COLORS.mintSoft,
  },

  statusPillInactive: {
    backgroundColor: COLORS.softBackground,
  },

  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },

  statusText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 6.8,
  },

  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  metricsRow: {
    marginTop: 14,
    paddingVertical: 11,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.line,
    flexDirection: "row",
  },

  metric: {
    flex: 1,
    alignItems: "center",
  },

  metricValue: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  metricLabel: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 7.5,
    color: COLORS.faint,
  },

  controlsRow: {
    paddingVertical: 12,
  },

  controlBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  controlDivider: {
    height: 1,
    marginVertical: 10,
    backgroundColor: COLORS.line,
  },

  controlTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },

  controlCopy: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 8,
    color: COLORS.faint,
  },

  toggle: {
    width: 43,
    height: 25,
    borderRadius: 13,
    padding: 3,
    backgroundColor: "#D7DADC",
  },

  toggleOn: {
    backgroundColor: COLORS.mint,
  },

  toggleKnob: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: COLORS.paper,
  },

  toggleKnobOn: {
    marginLeft: 18,
  },

  contractRow: {
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: 10,
    backgroundColor: COLORS.softBackground,
    flexDirection: "row",
    alignItems: "center",
  },

  contractIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  contractInfo: {
    flex: 1,
    marginLeft: 9,
  },

  contractTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9.5,
    color: COLORS.charcoal,
  },

  contractCopy: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 7.5,
    color: COLORS.faint,
  },

  emptyState: {
    paddingVertical: 50,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 10,
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: COLORS.charcoal,
  },

  emptyCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.faint,
  },
});