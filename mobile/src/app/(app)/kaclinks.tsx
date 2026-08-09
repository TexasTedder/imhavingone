import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  mint: "#41B39E",
  mintStrong: "#2E8F7D",
  mintSoft: "#D9F0EC",
  paper: "#FFFFFF",
  charcoal: "#23262B",
  darkGrey: "#5B5F63",
  faint: "#8A8E92",
  line: "#E7E5E1",
  sunshine: "#FFC75A",
  red: "#EA1D48",
};

type KaclinkPerson = {
  id: number;
  nickname: string;
  gender: "male" | "female";
  avatar: string;
  minutesAgo: number;
  count: number;
};

const KACLINKS: KaclinkPerson[] = [
  {
    id: 1,
    nickname: "Jess",
    gender: "female",
    avatar: "👩🏻",
    minutesAgo: 2,
    count: 1,
  },
  {
    id: 2,
    nickname: "Mike",
    gender: "male",
    avatar: "😎",
    minutesAgo: 5,
    count: 1,
  },
  {
    id: 3,
    nickname: "Alex",
    gender: "male",
    avatar: "👨🏻",
    minutesAgo: 12,
    count: 1,
  },
  {
    id: 4,
    nickname: "Lebo",
    gender: "male",
    avatar: "👨🏾",
    minutesAgo: 18,
    count: 1,
  },
  {
    id: 5,
    nickname: "Sam",
    gender: "female",
    avatar: "👩🏽",
    minutesAgo: 23,
    count: 1,
  },
  {
    id: 6,
    nickname: "Chris",
    gender: "male",
    avatar: "😎",
    minutesAgo: 28,
    count: 1,
  },
  {
    id: 7,
    nickname: "Taylor",
    gender: "female",
    avatar: "👩🏻",
    minutesAgo: 32,
    count: 1,
  },
  {
    id: 8,
    nickname: "Jordan",
    gender: "male",
    avatar: "👨🏻",
    minutesAgo: 40,
    count: 1,
  },
  {
    id: 9,
    nickname: "Dan",
    gender: "male",
    avatar: "🧔🏻",
    minutesAgo: 52,
    count: 1,
  },
  {
    id: 10,
    nickname: "Mike D",
    gender: "male",
    avatar: "👨🏻",
    minutesAgo: 60,
    count: 1,
  },
  {
    id: 11,
    nickname: "Alex S",
    gender: "female",
    avatar: "👩🏼",
    minutesAgo: 68,
    count: 1,
  },
];

export default function KaclinksScreen() {
  const sortedKaclinks = [...KACLINKS].sort(
    (a, b) => a.minutesAgo - b.minutesAgo
  );

  const totalKaclinks = sortedKaclinks.reduce(
    (total, item) => total + item.count,
    0
  );

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
              name="arrow-back"
              size={24}
              color={COLORS.charcoal}
            />
          </Pressable>

          <View style={styles.headerCentre}>
            <Text style={styles.title}>KaClinks</Text>

            <Text style={styles.totalText}>
              {totalKaclinks} KaClinks
            </Text>

            <Text style={styles.subtitle}>
              You&apos;ve earned from your friends
            </Text>
          </View>

          <View style={styles.totalBadge}>
            <Ionicons
              name="trophy-outline"
              size={19}
              color={COLORS.paper}
            />

            <Text style={styles.totalBadgeText}>
              {totalKaclinks}
            </Text>
          </View>
        </View>

        {/* LIST */}

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {sortedKaclinks.map((person) => (
            <Pressable
              key={person.id}
              style={({ pressed }) => [
                styles.personRow,
                pressed && styles.personRowPressed,
              ]}
            >
              <View
                style={[
                  styles.avatarRing,
                  {
                    borderColor:
                      person.gender === "female"
                        ? COLORS.sunshine
                        : COLORS.mint,
                  },
                ]}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarEmoji}>
                    {person.avatar}
                  </Text>
                </View>
              </View>

              <View style={styles.personInfo}>
                <Text style={styles.personName}>
                  {person.nickname}
                </Text>

                <Text style={styles.personTime}>
                  {formatAgo(person.minutesAgo)}
                </Text>
              </View>

              <View style={styles.kaclinkResult}>
                {person.gender === "female" ? (
                  <GlassKaclinkIcon />
                ) : (
                  <BottleKaclinkIcon />
                )}

                <Text style={styles.plusCount}>
                  +{person.count}
                </Text>
              </View>
            </Pressable>
          ))}

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* BOTTOM NAV */}

        <View style={styles.bottomNav}>
          <BottomNavItem
            icon="location-outline"
            label="Map"
            onPress={() => router.replace("/map")}
          />

          <BottomNavItem
            icon="people"
            label="KaClinks"
            active
          />

          <View style={styles.centreNavSpace} />

          <BottomNavItem
            icon="heart-outline"
            label="Activity"
          />

          <BottomNavItem
            icon="person-outline"
            label="Profile"
          />
        </View>

        {/* CENTRAL HAVING ONE BUTTON */}

        <View style={styles.centralAction}>
          <Pressable
            style={styles.centralCircle}
            onPress={() => router.replace("/map")}
          >
            <Ionicons
              name="camera-outline"
              size={30}
              color={COLORS.paper}
            />
          </Pressable>

          <Text style={styles.centralLabel}>LOG</Text>

          <Text style={styles.centralSubLabel}>
            HAVING ONE
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* -----------------------------------------------------------
   CUSTOM KACLINK ICON — BOTTLES
   Boys / male friend
----------------------------------------------------------- */

function BottleKaclinkIcon() {
  return (
    <View style={styles.kaclinkIconBox}>
      <View
        style={[
          styles.miniBottle,
          styles.bottleLeft,
        ]}
      >
        <View style={styles.miniBottleNeck} />
        <View style={styles.miniBottleBody}>
          <View style={styles.bottleLiquid} />
        </View>
      </View>

      <View
        style={[
          styles.miniBottle,
          styles.bottleRight,
        ]}
      >
        <View style={styles.miniBottleNeck} />
        <View style={styles.miniBottleBody}>
          <View style={styles.bottleLiquid} />
        </View>
      </View>

      <View style={styles.clinkSparkOne} />
      <View style={styles.clinkSparkTwo} />
    </View>
  );
}

/* -----------------------------------------------------------
   CUSTOM KACLINK ICON — GLASSES
   Girls / female friend
----------------------------------------------------------- */

function GlassKaclinkIcon() {
  return (
    <View style={styles.kaclinkIconBox}>
      <View
        style={[
          styles.miniGlass,
          styles.glassLeft,
        ]}
      >
        <View style={styles.glassLiquid} />
        <View style={styles.glassStem} />
        <View style={styles.glassBase} />
      </View>

      <View
        style={[
          styles.miniGlass,
          styles.glassRight,
        ]}
      >
        <View style={styles.glassLiquid} />
        <View style={styles.glassStem} />
        <View style={styles.glassBase} />
      </View>

      <View style={styles.clinkSparkOne} />
      <View style={styles.clinkSparkTwo} />
    </View>
  );
}

function BottomNavItem({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={styles.navItem}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={21}
        color={
          active
            ? COLORS.mintStrong
            : COLORS.charcoal
        }
      />

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function formatAgo(minutesAgo: number) {
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }

  const hours = Math.floor(minutesAgo / 60);

  return hours === 1
    ? "1h ago"
    : `${hours}h ago`;
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

  /* HEADER */

  header: {
    minHeight: 108,
    paddingHorizontal: 20,
    paddingTop: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  headerCentre: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    lineHeight: 25,
    color: COLORS.charcoal,
  },

  totalText: {
    marginTop: 6,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 11,
    color: COLORS.mintStrong,
  },

  subtitle: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
  },

  totalBadge: {
    height: 36,
    minWidth: 65,
    borderRadius: 18,
    paddingHorizontal: 10,
    backgroundColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  totalBadgeText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.paper,
  },

  /* LIST */

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 22,
  },

  personRow: {
    minHeight: 73,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
  },

  personRowPressed: {
    backgroundColor: "#F8F9F8",
  },

  avatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    padding: 2,
    backgroundColor: COLORS.paper,
  },

  avatar: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: "#E9E2D8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarEmoji: {
    fontSize: 29,
  },

  personInfo: {
    flex: 1,
    marginLeft: 13,
  },

  personName: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  personTime: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.faint,
  },

  kaclinkResult: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  plusCount: {
    minWidth: 22,
    fontFamily: "DMSans_700Bold",
    fontSize: 13,
    color: COLORS.mintStrong,
  },

  /* KACLINK ICONS */

  kaclinkIconBox: {
    width: 40,
    height: 38,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  miniBottle: {
    position: "absolute",
    width: 10,
    height: 28,
  },

  bottleLeft: {
    left: 9,
    transform: [{ rotate: "14deg" }],
  },

  bottleRight: {
    right: 9,
    transform: [{ rotate: "-14deg" }],
  },

  miniBottleNeck: {
    alignSelf: "center",
    width: 4,
    height: 7,
    borderWidth: 1.2,
    borderBottomWidth: 0,
    borderColor: COLORS.charcoal,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  miniBottleBody: {
    width: 10,
    height: 20,
    borderWidth: 1.2,
    borderColor: COLORS.charcoal,
    borderRadius: 2,
    overflow: "hidden",
    justifyContent: "flex-end",
  },

  bottleLiquid: {
    width: "100%",
    height: "70%",
    backgroundColor: COLORS.sunshine,
  },

  miniGlass: {
    position: "absolute",
    width: 12,
    height: 27,
    alignItems: "center",
  },

  glassLeft: {
    left: 8,
    transform: [{ rotate: "16deg" }],
  },

  glassRight: {
    right: 8,
    transform: [{ rotate: "-16deg" }],
  },

  glassLiquid: {
    width: 11,
    height: 10,
    borderWidth: 1.2,
    borderColor: COLORS.charcoal,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: COLORS.sunshine,
  },

  glassStem: {
    width: 1.2,
    height: 9,
    backgroundColor: COLORS.charcoal,
  },

  glassBase: {
    width: 9,
    height: 1.2,
    backgroundColor: COLORS.charcoal,
  },

  clinkSparkOne: {
    position: "absolute",
    top: 3,
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: COLORS.sunshine,
  },

  clinkSparkTwo: {
    position: "absolute",
    top: 8,
    right: 3,
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.sunshine,
    transform: [{ rotate: "-30deg" }],
  },

  bottomSpace: {
    height: 90,
  },

  /* BOTTOM NAV */

  bottomNav: {
    height: 65,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.line,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    marginTop: 3,
    fontFamily: "DMSans_500Medium",
    fontSize: 8,
    color: COLORS.charcoal,
  },

  navLabelActive: {
    color: COLORS.mintStrong,
  },

  centreNavSpace: {
    width: 65,
  },

  centralAction: {
    position: "absolute",
    bottom: 28,
    left: width / 2 - 39,
    width: 78,
    alignItems: "center",
  },

  centralCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: COLORS.paper,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.17,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 8,
  },

  centralLabel: {
    marginTop: 1,
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    color: COLORS.mintStrong,
  },

  centralSubLabel: {
    marginTop: -1,
    fontFamily: "DMSans_500Medium",
    fontSize: 7,
    color: COLORS.mintStrong,
  },
});