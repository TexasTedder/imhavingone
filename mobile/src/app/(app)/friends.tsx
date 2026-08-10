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
  inactive: "#C8CCCE",
  softBackground: "#F7F7F4",
  beerGold: "#C88A16",
};

type FriendTab = "all" | "having" | "close";
type FriendFilter = "all" | "active" | "recently" | "az";
type DrinkType = "bottle" | "wine" | "beer";

type Friend = {
  id: number;
  nickname: string;
  handle: string;
  avatar: string;
  minutesAgo: number;
  status: "having" | "recent" | "inactive";
  havingCount: number;
  drinkType?: DrinkType;
  drinkName?: string;
  closeFriend: boolean;
};

const FRIENDS: Friend[] = [
  {
    id: 1,
    nickname: "Mike",
    handle: "@Mike",
    avatar: "😎",
    minutesAgo: 10,
    status: "having",
    havingCount: 3,
    drinkType: "bottle",
    drinkName: "Heineken Silver",
    closeFriend: true,
  },
  {
    id: 2,
    nickname: "Jess",
    handle: "@Jessie",
    avatar: "👩🏻",
    minutesAgo: 24,
    status: "having",
    havingCount: 2,
    drinkType: "wine",
    drinkName: "Red Wine",
    closeFriend: true,
  },
  {
    id: 3,
    nickname: "Alex",
    handle: "@AlexD",
    avatar: "👨🏻",
    minutesAgo: 8,
    status: "having",
    havingCount: 1,
    drinkType: "bottle",
    drinkName: "Lager",
    closeFriend: false,
  },
  {
    id: 4,
    nickname: "Dan",
    handle: "@Danny",
    avatar: "🧔🏻",
    minutesAgo: 39,
    status: "having",
    havingCount: 2,
    drinkType: "beer",
    drinkName: "Draft Beer",
    closeFriend: false,
  },
  {
    id: 5,
    nickname: "Lebo",
    handle: "@Lebo",
    avatar: "👨🏾",
    minutesAgo: 86,
    status: "recent",
    havingCount: 3,
    drinkType: "bottle",
    drinkName: "Lager",
    closeFriend: true,
  },
  {
    id: 6,
    nickname: "Taylor",
    handle: "@Tay",
    avatar: "👩🏻",
    minutesAgo: 190,
    status: "recent",
    havingCount: 1,
    drinkType: "wine",
    drinkName: "Rosé",
    closeFriend: false,
  },
  {
    id: 7,
    nickname: "Sam",
    handle: "@Sammy",
    avatar: "🧑🏻",
    minutesAgo: 2880,
    status: "inactive",
    havingCount: 0,
    closeFriend: false,
  },
  {
    id: 8,
    nickname: "Chris",
    handle: "@Chris",
    avatar: "👨🏼",
    minutesAgo: 5760,
    status: "inactive",
    havingCount: 0,
    closeFriend: true,
  },
];

function getRecencyColor(minutesAgo: number) {
  if (minutesAgo <= 15) return COLORS.mint;
  if (minutesAgo <= 60) return COLORS.sunshine;
  return COLORS.inactive;
}

function getActivityText(friend: Friend) {
  if (friend.status === "having") {
    if (friend.minutesAgo <= 15) return "Having One now";
    return `Having One · ${friend.minutesAgo} min ago`;
  }

  if (friend.status === "recent") {
    if (friend.minutesAgo < 120) {
      return `Active ${friend.minutesAgo} min ago`;
    }

    const hours = Math.floor(friend.minutesAgo / 60);
    return `Active ${hours}h ago`;
  }

  const days = Math.max(1, Math.floor(friend.minutesAgo / 1440));
  return `Active ${days}d ago`;
}

export default function FriendsScreen() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FriendTab>("all");
  const [filter, setFilter] = useState<FriendFilter>("all");
  const [closeFriendIds, setCloseFriendIds] = useState<number[]>(
    FRIENDS.filter((friend) => friend.closeFriend).map((friend) => friend.id)
  );

  const visibleFriends = useMemo(() => {
    let result = FRIENDS.filter((friend) => {
      const searchValue = search.trim().toLowerCase();

      if (!searchValue) return true;

      return (
        friend.nickname.toLowerCase().includes(searchValue) ||
        friend.handle.toLowerCase().includes(searchValue)
      );
    });

    if (tab === "having") {
      result = result.filter((friend) => friend.status === "having");
    }

    if (tab === "close") {
      result = result.filter((friend) =>
        closeFriendIds.includes(friend.id)
      );
    }

    if (filter === "active") {
      result = result.filter((friend) => friend.status === "having");
    }

    if (filter === "recently") {
      result = [...result].sort(
        (a, b) => a.minutesAgo - b.minutesAgo
      );
    }

    if (filter === "az") {
      result = [...result].sort((a, b) =>
        a.nickname.localeCompare(b.nickname)
      );
    }

    return result;
  }, [search, tab, filter, closeFriendIds]);

  const toggleCloseFriend = (id: number) => {
    setCloseFriendIds((current) =>
      current.includes(id)
        ? current.filter((friendId) => friendId !== id)
        : [...current, id]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Friends</Text>
            <Text style={styles.subtitle}>
              Your people.
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable style={styles.headerButton}>
              <Ionicons
                name="qr-code-outline"
                size={21}
                color={COLORS.charcoal}
              />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={() => router.push("/add-friends")}
            >
              <Ionicons
                name="person-add-outline"
                size={21}
                color={COLORS.charcoal}
              />
            </Pressable>
          </View>
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
            placeholder="Search friends"
            placeholderTextColor={COLORS.faint}
            style={styles.searchInput}
            autoCapitalize="none"
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

        {/* MAIN TABS */}

        <View style={styles.tabs}>
          <TabButton
            label="All Friends"
            active={tab === "all"}
            onPress={() => setTab("all")}
          />

          <TabButton
            label="Having One"
            active={tab === "having"}
            onPress={() => setTab("having")}
          />

          <TabButton
            label="Requests"
            active={tab === "close"}
            onPress={() => setTab("close")}
          />
        </View>

        {/* FILTERS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filters}
        >
          <FilterChip
            label="All"
            active={filter === "all"}
            onPress={() => setFilter("all")}
          />

          <FilterChip
            label="Active"
            active={filter === "active"}
            onPress={() => setFilter("active")}
          />

          <FilterChip
            label="Recently"
            active={filter === "recently"}
            onPress={() => setFilter("recently")}
          />

          <FilterChip
            label="A–Z"
            active={filter === "az"}
            onPress={() => setFilter("az")}
          />
        </ScrollView>

        {/* FRIEND COUNT */}

        <View style={styles.listHeading}>
          <Text style={styles.listHeadingText}>
            {visibleFriends.length}{" "}
            {visibleFriends.length === 1 ? "friend" : "friends"}
          </Text>

          <Text style={styles.listHeadingHint}>
            Tap an active friend to find them
          </Text>
        </View>

        {/* FRIEND LIST */}

        <ScrollView
          style={styles.friendList}
          contentContainerStyle={styles.friendListContent}
          showsVerticalScrollIndicator={false}
        >
          {visibleFriends.map((friend) => (
            <FriendRow
              key={friend.id}
              friend={friend}
              closeFriend={closeFriendIds.includes(friend.id)}
              onToggleClose={() => toggleCloseFriend(friend.id)}
            />
          ))}

          {visibleFriends.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="people-outline"
                  size={30}
                  color={COLORS.mintStrong}
                />
              </View>

              <Text style={styles.emptyTitle}>No friends found</Text>

              <Text style={styles.emptyCopy}>
                Try another search or filter.
              </Text>
            </View>
          )}
          <View style={{ height: 88 }} />

        </ScrollView>

        {/* BOTTOM NAV */}

        <View style={styles.bottomNav}>
          <BottomNavItem
            icon="location"
            label="Map"
            onPress={() => router.push("/map")}
          />

          <BottomNavItem
            icon="people"
            label="Friends"
            active
          />

          <View style={styles.navSpacer} />

          <BottomNavItem
            icon="heart-outline"
            label="Activity"
          />

          <BottomNavItem
            icon="person-outline"
            label="Profile"
          />
        </View>

        {/* CENTRE ACTION */}

        <View style={styles.centerActionWrapper}>
          <Pressable style={styles.centerAction}>
            <Text style={styles.centerActionEmoji}>🍺</Text>
          </Pressable>

          <Text style={styles.centerActionTop}>LOG</Text>
          <Text style={styles.centerActionBottom}>
            HAVING ONE
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FriendRow({
  friend,
  closeFriend,
  onToggleClose,
}: {
  friend: Friend;
  closeFriend: boolean;
  onToggleClose: () => void;
}) {
  const active = friend.status === "having";
  const ringColor = getRecencyColor(friend.minutesAgo);

  return (
    <Pressable
      style={styles.friendRow}
      onPress={() => {
        if (active) {
          router.push("/map");
        }
      }}
    >
      <View
        style={[
          styles.avatarBorder,
          {
            borderColor: ringColor,
          },
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>
            {friend.avatar}
          </Text>
        </View>
      </View>

      <View style={styles.friendInfo}>
        <View style={styles.friendNameRow}>
          <Text style={styles.friendName}>
            {friend.nickname}
          </Text>

          <Text style={styles.friendHandle}>
            {friend.handle}
          </Text>

          {active && friend.minutesAgo <= 15 && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
        </View>

        <Text
          style={[
            styles.activityText,
            active && styles.activityTextActive,
          ]}
        >
          {getActivityText(friend)}
        </Text>

        {friend.drinkName && (
          <View style={styles.drinkRow}>
            <GenericDrinkIcon
              type={friend.drinkType ?? "bottle"}
              minutesAgo={friend.minutesAgo}
            />

            <Text style={styles.drinkName}>
              {friend.drinkName}
            </Text>

            {friend.havingCount > 1 && (
              <View style={styles.havingCount}>
                <Text style={styles.havingCountText}>
                  {friend.havingCount}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <Pressable
        style={styles.starButton}
        onPress={(event) => {
          event.stopPropagation();
          onToggleClose();
        }}
      >
        <Ionicons
          name={closeFriend ? "star" : "star-outline"}
          size={23}
          color={
            closeFriend ? COLORS.sunshine : COLORS.faint
          }
        />
      </Pressable>

      {active && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={COLORS.faint}
        />
      )}
    </Pressable>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.tabButton,
        active && styles.tabButtonActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.tabText,
          active && styles.tabTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.filterChip,
        active && styles.filterChipActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterChipText,
          active && styles.filterChipTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
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
          active ? COLORS.mintStrong : COLORS.charcoal
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

function GenericDrinkIcon({
  type,
  minutesAgo,
}: {
  type: DrinkType;
  minutesAgo: number;
}) {
  const fillHeight =
    minutesAgo <= 15
      ? "82%"
      : minutesAgo <= 60
      ? "44%"
      : "0%";

  if (type === "wine") {
    return (
      <View style={styles.genericDrinkWrap}>
        <View style={styles.wineCup}>
          <View
            style={[
              styles.drinkLiquid,
              {
                height: fillHeight,
              },
            ]}
          />
        </View>

        <View style={styles.wineStem} />
        <View style={styles.wineBase} />
      </View>
    );
  }

  if (type === "beer") {
    return (
      <View style={styles.genericDrinkWrap}>
        <View style={styles.beerMug}>
          <View
            style={[
              styles.drinkLiquid,
              {
                height: fillHeight,
              },
            ]}
          />
        </View>

        <View style={styles.beerHandle} />
      </View>
    );
  }

  return (
    <View style={styles.genericDrinkWrap}>
      <View style={styles.bottleNeck} />

      <View style={styles.bottleBody}>
        <View
          style={[
            styles.drinkLiquid,
            {
              height: fillHeight,
            },
          ]}
        />
      </View>
    </View>
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
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.1,
    color: COLORS.charcoal,
  },

  subtitle: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: COLORS.darkGrey,
  },

  headerActions: {
    flexDirection: "row",
    gap: 9,
  },

  headerButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.paper,
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

  tabs: {
    marginTop: 17,
    marginHorizontal: 20,
    height: 42,
    borderRadius: 21,
    padding: 3,
    backgroundColor: COLORS.softBackground,
    flexDirection: "row",
  },

  tabButton: {
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  tabButtonActive: {
    backgroundColor: COLORS.mint,
  },

  tabText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: COLORS.darkGrey,
  },

  tabTextActive: {
    fontFamily: "DMSans_600SemiBold",
    color: COLORS.paper,
  },

  filterScroll: {
  flexGrow: 0,
  flexShrink: 0,
},

  filters: {
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 6,
    gap: 7,
  },

  filterChip: {
    height: 31,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.paper,
  },

  filterChipActive: {
    borderColor: COLORS.mint,
    backgroundColor: COLORS.mintSoft,
  },

  filterChipText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: COLORS.darkGrey,
  },

  filterChipTextActive: {
    color: COLORS.mintStrong,
  },

  listHeading: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listHeadingText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  listHeadingHint: {
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.faint,
  },

  friendList: {
    flex: 1,
  },

  friendListContent: {
    paddingHorizontal: 20,
  },

  friendRow: {
    minHeight: 82,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarBorder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    padding: 2,
    backgroundColor: COLORS.paper,
  },

  avatar: {
    flex: 1,
    borderRadius: 23,
    backgroundColor: "#EAE2D8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarEmoji: {
    fontSize: 31,
  },

  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },

  friendNameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  friendName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  friendHandle: {
    marginLeft: 6,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.faint,
  },

  liveBadge: {
    height: 17,
    marginLeft: 6,
    borderRadius: 9,
    paddingHorizontal: 6,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: COLORS.mint,
  },

  liveText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 7,
    color: COLORS.mintStrong,
  },

  activityText: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 10.5,
    color: COLORS.faint,
  },

  activityTextActive: {
    color: COLORS.mintStrong,
  },

  drinkRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  drinkName: {
    marginLeft: 5,
    fontFamily: "DMSans_500Medium",
    fontSize: 9.5,
    color: COLORS.darkGrey,
  },

  havingCount: {
    minWidth: 17,
    height: 17,
    marginLeft: 6,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: COLORS.sunshine,
    alignItems: "center",
    justifyContent: "center",
  },

  havingCountText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    color: COLORS.charcoal,
  },

  starButton: {
    width: 38,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  inviteCard: {
    minHeight: 78,
    marginTop: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  inviteIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  inviteTextBlock: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  inviteTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 13,
    color: COLORS.charcoal,
  },

  inviteCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    lineHeight: 13,
    color: COLORS.darkGrey,
  },

  emptyState: {
    paddingVertical: 48,
    alignItems: "center",
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  emptyCopy: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.faint,
  },

  genericDrinkWrap: {
    width: 15,
    height: 22,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },

  drinkLiquid: {
    position: "absolute",
    left: 1,
    right: 1,
    bottom: 1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: COLORS.beerGold,
    opacity: 0.9,
  },

  bottleNeck: {
    width: 5,
    height: 6,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.darkGrey,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  bottleBody: {
    width: 10,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },

  wineCup: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "hidden",
    position: "relative",
  },

  wineStem: {
    width: 1,
    height: 6,
    backgroundColor: COLORS.darkGrey,
  },

  wineBase: {
    width: 8,
    height: 1,
    backgroundColor: COLORS.darkGrey,
  },

  beerMug: {
    width: 11,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderRadius: 2,
    overflow: "hidden",
    position: "relative",
  },

  beerHandle: {
    position: "absolute",
    right: -1,
    bottom: 3,
    width: 5,
    height: 9,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: COLORS.darkGrey,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 61,
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

  navSpacer: {
    width: 60,
  },

  navLabel: {
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
    fontSize: 8,
    color: COLORS.charcoal,
  },

  navLabelActive: {
    color: COLORS.mintStrong,
  },

  centerActionWrapper: {
    position: "absolute",
    bottom: 4,
    left: "50%",
    width: 82,
    marginLeft: -41,
    alignItems: "center",
  },

  centerAction: {
    width: 62,
    height: 62,
    marginTop: -29,
    borderRadius: 31,
    borderWidth: 4,
    borderColor: COLORS.paper,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 8,
  },

  centerActionEmoji: {
    fontSize: 29,
  },

  centerActionTop: {
    marginTop: 1,
    fontFamily: "DMSans_700Bold",
    fontSize: 7,
    letterSpacing: 0.5,
    color: COLORS.mintStrong,
  },

  centerActionBottom: {
    marginTop: -1,
    fontFamily: "DMSans_500Medium",
    fontSize: 6.5,
    letterSpacing: 0.2,
    color: COLORS.mintStrong,
  },
});