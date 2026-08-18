import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

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
  red: "#EA1D48",
  sunshine: "#FFC75A",
  inactive: "#C8CCCE",
  beerGold: "#C88A16",
};

type DrinkType = "bottle" | "wine" | "beer";

type Drink = {
  id: string;
  name: string;
  short: string;
  emoji: string;
};

type MapPerson = {
  id: number;
  nickname: string;
  time: string;
  minutesAgo: number;
  havingCount: number;
  latitude: number;
  longitude: number;
  avatar: string;
  friend: boolean;
  gender?: "male" | "female";
  drinkType: DrinkType;
  location?: string;
  drinkName?: string;
  kaclinks?: number;
  photo?: string;
};

const DRINKS: Drink[] = [
  { id: "heineken", name: "Heineken", short: "Heineken", emoji: "🍺" },
  { id: "guinness", name: "Guinness", short: "Guinness", emoji: "🍺" },
  { id: "grolsch", name: "Grolsch", short: "Grolsch", emoji: "🍺" },
  { id: "corona", name: "Corona Extra", short: "Corona", emoji: "🍺" },
  { id: "wine", name: "Wine", short: "Wine", emoji: "🍷" },
  { id: "champagne", name: "Champagne", short: "Champagne", emoji: "🥂" },
  { id: "whisky", name: "Whisky", short: "Whisky", emoji: "🥃" },
];

const PEOPLE: MapPerson[] = [
  {
    id: 1,
    nickname: "Alex",
    time: "14:22",
    minutesAgo: 8,
    havingCount: 1,
    latitude: -29.845,
    longitude: 31.002,
    avatar: "👨🏻",
    friend: true,
    gender: "male",
    drinkType: "bottle",
    location: "Durban North, Durban",
    drinkName: "Lager",
    kaclinks: 8,
  },
  {
    id: 2,
    nickname: "Jess",
    time: "14:18",
    minutesAgo: 24,
    havingCount: 2,
    latitude: -29.848,
    longitude: 30.993,
    avatar: "👩🏻",
    friend: true,
    gender: "female",
    drinkType: "wine",
    location: "Berea, Durban",
    drinkName: "Red Wine",
    kaclinks: 12,
  },
  {
    id: 3,
    nickname: "Mike",
    time: "14:20",
    minutesAgo: 10,
    havingCount: 3,
    latitude: -29.848,
    longitude: 31.013,
    avatar: "😎",
    friend: true,
    gender: "male",
    drinkType: "bottle",
    location: "Umhlanga Rocks, Durban",
    drinkName: "Heineken Silver",
    kaclinks: 25,
    photo:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    nickname: "You",
    time: "14:25",
    minutesAgo: 5,
    havingCount: 1,
    latitude: -29.857,
    longitude: 31.002,
    avatar: "😎",
    friend: true,
    gender: "male",
    drinkType: "bottle",
    location: "Durban",
    drinkName: "Heineken",
    kaclinks: 3,
  },
  {
    id: 5,
    nickname: "Sam",
    time: "14:15",
    minutesAgo: 68,
    havingCount: 1,
    latitude: -29.859,
    longitude: 30.992,
    avatar: "",
    friend: false,
    drinkType: "bottle",
  },
  {
    id: 6,
    nickname: "Dan",
    time: "14:21",
    minutesAgo: 39,
    havingCount: 2,
    latitude: -29.859,
    longitude: 31.015,
    avatar: "🧔🏻",
    friend: true,
    gender: "male",
    drinkType: "beer",
    location: "La Lucia, Durban",
    drinkName: "Draft Beer",
    kaclinks: 10,
  },
  {
    id: 7,
    nickname: "Taylor",
    time: "14:17",
    minutesAgo: 72,
    havingCount: 1,
    latitude: -29.869,
    longitude: 30.994,
    avatar: "👩🏻",
    friend: true,
    gender: "female",
    drinkType: "wine",
    location: "Glenwood, Durban",
    drinkName: "Rosé",
    kaclinks: 7,
  },
  {
    id: 8,
    nickname: "Chris",
    time: "14:19",
    minutesAgo: 88,
    havingCount: 1,
    latitude: -29.868,
    longitude: 31.014,
    avatar: "",
    friend: false,
    drinkType: "beer",
  },
  {
    id: 9,
    nickname: "Lebo",
    time: "14:16",
    minutesAgo: 33,
    havingCount: 3,
    latitude: -29.877,
    longitude: 31.003,
    avatar: "👨🏾",
    friend: true,
    gender: "male",
    drinkType: "bottle",
    location: "Morningside, Durban",
    drinkName: "Lager",
    kaclinks: 18,
  },
  {
    id: 10,
    nickname: "Jordan",
    time: "14:12",
    minutesAgo: 103,
    havingCount: 1,
    latitude: -29.885,
    longitude: 31.002,
    avatar: "",
    friend: false,
    drinkType: "wine",
  },
];

const CAROUSEL_COPIES = 5;
const CAROUSEL_ITEM_WIDTH = 56;
const LOOPED_DRINKS = Array.from(
  { length: CAROUSEL_COPIES },
  (_, copyIndex) =>
    DRINKS.map((drink) => ({
      ...drink,
      loopKey: `${copyIndex}-${drink.id}`,
      originalIndex: DRINKS.findIndex((item) => item.id === drink.id),
    }))
).flat();

function getRecencyColor(minutesAgo: number) {
  if (minutesAgo <= 15) return COLORS.mint;
  if (minutesAgo <= 60) return COLORS.sunshine;
  return COLORS.inactive;
}

function getFillLevel(minutesAgo: number): "full" | "half" | "empty" {
  if (minutesAgo <= 15) return "full";
  if (minutesAgo <= 60) return "half";
  return "empty";
}

function getOrdinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${value}th`;

  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}

function getHavingText(person: MapPerson) {
  if (person.havingCount <= 1) return "is having one!";
  if (person.havingCount === 2) return "is having another";

  const possessive = person.gender === "female" ? "her" : "his";
  return `is having ${possessive} ${getOrdinal(person.havingCount)}`;
}

export default function MapScreen() {
  const [mapFilter, setMapFilter] = useState<"everyone" | "friends">(
    "everyone"
  );
  const [selectedDrink, setSelectedDrink] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState<MapPerson | null>(null);
  const [hasKaclinked, setHasKaclinked] = useState(false);

  const drinkScrollRef = useRef<ScrollView | null>(null);
  const cycleWidth = DRINKS.length * CAROUSEL_ITEM_WIDTH;
  const initialCarouselOffset = cycleWidth * 2;

  useEffect(() => {
    const timeout = setTimeout(() => {
      drinkScrollRef.current?.scrollTo({
        x: initialCarouselOffset,
        animated: false,
      });
    }, 60);

    return () => clearTimeout(timeout);
  }, [initialCarouselOffset]);

  const visiblePeople =
    mapFilter === "friends"
      ? PEOPLE.filter((person) => person.friend)
      : PEOPLE;

  const currentDrink = DRINKS[selectedDrink];

  const handleCarouselMomentumEnd = (offsetX: number) => {
    const minSafeOffset = cycleWidth;
    const maxSafeOffset = cycleWidth * 3;

    if (offsetX < minSafeOffset || offsetX > maxSafeOffset) {
      const normalized = ((offsetX % cycleWidth) + cycleWidth) % cycleWidth;

      drinkScrollRef.current?.scrollTo({
        x: cycleWidth * 2 + normalized,
        animated: false,
      });
    }
  };

  const openFriend = (person: MapPerson) => {
    if (!person.friend || person.nickname === "You") return;

    setHasKaclinked(false);
    setSelectedFriend(person);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* MAP */}

        <MapView
          provider={PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFillObject}
          mapType="mutedStandard"
          //showsPointsOfInterests={false}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          initialRegion={{
            latitude: -29.862,
            longitude: 31.004,
            latitudeDelta: 0.055,
            longitudeDelta: 0.04,
          }}
          showsCompass={false}
          showsUserLocation={false}
          showsMyLocationButton={false}
          toolbarEnabled={false}
        >
          {visiblePeople.map((person) => (
            <Marker
              key={person.id}
              coordinate={{
                latitude: person.latitude,
                longitude: person.longitude,
              }}
              tracksViewChanges={false}
              onPress={() => openFriend(person)}
            >
              <UserMarker person={person} />
            </Marker>
          ))}
        </MapView>

        {/* TOP CONTROLS */}

        <View style={styles.topControls}>
          <Pressable
            style={styles.roundButton}
            onPress={() => router.push("/kaclinks")}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.charcoal}
            />

            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </Pressable>

          <View style={styles.filterControl}>
            <Pressable
              style={[
                styles.filterButton,
                mapFilter === "everyone" && styles.filterButtonSelected,
              ]}
              onPress={() => {
                setSelectedFriend(null);
                setMapFilter("everyone");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  mapFilter === "everyone" && styles.filterTextSelected,
                ]}
              >
                Everyone
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.filterButton,
                mapFilter === "friends" && styles.filterButtonSelected,
              ]}
              onPress={() => {
                setSelectedFriend(null);
                setMapFilter("friends");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  mapFilter === "friends" && styles.filterTextSelected,
                ]}
              >
                Friends
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.roundButton}
            onPress={() => router.push("/admin")}
          >
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.charcoal}
            />
          </Pressable>
        </View>

        {/* LOCATION BUTTON */}

        <Pressable style={styles.locationButton}>
          <Ionicons
            name="locate-outline"
            size={24}
            color={COLORS.charcoal}
          />
        </Pressable>

        {/* FRIEND STATUS POPUP — TRAY BELOW REMAINS UNCHANGED */}

        {selectedFriend && (
          <View style={styles.friendSheet}>
            <View style={styles.friendSheetHandle} />

            <View style={styles.friendHeader}>
              <Pressable
                style={styles.closeFriendButton}
                onPress={() => setSelectedFriend(null)}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={COLORS.charcoal}
                />
              </Pressable>

              <View
                style={[
                  styles.friendAvatar,
                  {
                    borderColor: getRecencyColor(selectedFriend.minutesAgo),
                  },
                ]}
              >
                <Text style={styles.friendAvatarEmoji}>
                  {selectedFriend.avatar}
                </Text>
              </View>

              <View style={styles.friendHeaderInfo}>
                <View style={styles.friendNameRow}>
                  <Text style={styles.friendName}>
                    {selectedFriend.nickname}
                  </Text>

                  {selectedFriend.minutesAgo <= 15 && (
                    <View style={styles.liveBadge}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                </View>

                <View style={styles.friendLocationRow}>
                  <Ionicons
                    name="location-outline"
                    size={11}
                    color={COLORS.darkGrey}
                  />
                  <Text style={styles.friendLocation} numberOfLines={1}>
                    {selectedFriend.location ?? "Location hidden"}
                  </Text>
                </View>

                <Text style={styles.friendMeta}>
                  {selectedFriend.time} · {selectedFriend.minutesAgo} min ago
                </Text>
              </View>

              <Pressable
                style={[
                  styles.kaclinkButton,
                  hasKaclinked && styles.kaclinkButtonDone,
                ]}
                onPress={() => setHasKaclinked(true)}
              >
                <Text style={styles.kaclinkIcon}>🍻</Text>
                <Text style={styles.kaclinkButtonText}>
                  {hasKaclinked ? "KaClinked" : "KaClink"}
                </Text>
              </Pressable>
            </View>

            {selectedFriend.photo ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/status",
                  params: {
                    nickname: selectedFriend.nickname,
                    time: selectedFriend.time,
                    drinkName: selectedFriend.drinkName ?? "Having One",
                    location: selectedFriend.location ?? "Location hidden",
                    avatar: selectedFriend.avatar,
                    photo: selectedFriend.photo,
                    kaclinks: String(selectedFriend.kaclinks ?? 0),
                    minutesAgo: String(selectedFriend.minutesAgo),
                  },
                })
              }
            >
              <Image
                source={{ uri: selectedFriend.photo }}
                style={styles.friendPhoto}
                resizeMode="cover"
              />
            </Pressable>
          ) : (
            <View style={styles.friendPhotoPlaceholder}>
                <Ionicons
                  name="image-outline"
                  size={34}
                  color={COLORS.faint}
                />
                <Text style={styles.friendPhotoPlaceholderText}>
                  Latest Having One photo
                </Text>
              </View>
            )}

            <View style={styles.kaclinkSummary}>
              <View style={styles.kaclinkCountBlock}>
                <Text style={styles.kaclinkSummaryIcon}>🍻</Text>
                <View>
                  <Text style={styles.kaclinkCount}>
                    {(selectedFriend.kaclinks ?? 0) + (hasKaclinked ? 1 : 0)}
                  </Text>
                  <Text style={styles.kaclinkLabel}>KaClinks</Text>
                </View>
              </View>

              <View style={styles.kaclinkPeople}>
                <View style={styles.miniReactionAvatar}>
                  <Text style={styles.miniReactionEmoji}>👨🏻</Text>
                </View>
                <View
                  style={[
                    styles.miniReactionAvatar,
                    styles.miniReactionOverlap,
                  ]}
                >
                  <Text style={styles.miniReactionEmoji}>👩🏻</Text>
                </View>
                <View
                  style={[
                    styles.miniReactionAvatar,
                    styles.miniReactionOverlap,
                  ]}
                >
                  <Text style={styles.miniReactionEmoji}>🧔🏽</Text>
                </View>

                <Text style={styles.reactionCopy}>
                  You, Jess, Alex +22 others KaClinked
                </Text>
              </View>

              <Pressable
                style={styles.summaryNext}
                onPress={() =>
                  router.push({
                    pathname: "/status",
                    params: {
                      nickname: selectedFriend.nickname,
                      time: selectedFriend.time,
                      drinkName: selectedFriend.drinkName ?? "Having One",
                      location: selectedFriend.location ?? "Location hidden",
                      avatar: selectedFriend.avatar,
                      photo: selectedFriend.photo ?? "",
                      kaclinks: String(selectedFriend.kaclinks ?? 0),
                      minutesAgo: String(selectedFriend.minutesAgo),
                    },
                  })
                }
              >
                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color={COLORS.charcoal}
                />
              </Pressable>
            </View>

            <View style={styles.friendDrinkRow}>
              <GenericDrinkIcon
                type={selectedFriend.drinkType}
                minutesAgo={selectedFriend.minutesAgo}
              />

              <View style={styles.friendDrinkInfo}>
                <Text style={styles.friendDrinkName}>
                  {selectedFriend.drinkName ?? "Having One"}
                </Text>
                <Text style={styles.friendDrinkSub}>
                  That’s what I’m having!
                </Text>
              </View>

              <Pressable style={styles.moreButton}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={17}
                  color={COLORS.charcoal}
                />
              </Pressable>
            </View>
          </View>
        )}

        {/* DRINK TRAY */}

        <View style={styles.bottomPanel}>
          <View style={styles.dragHandle} />

          <View style={styles.drinkTray}>
            <Ionicons
              name="chevron-back"
              size={21}
              color={COLORS.charcoal}
            />

            <ScrollView
              ref={drinkScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.drinkScroll}
              decelerationRate="fast"
              onMomentumScrollEnd={(event) =>
                handleCarouselMomentumEnd(
                  event.nativeEvent.contentOffset.x
                )
              }
            >
              {LOOPED_DRINKS.map((drink) => {
                const active = selectedDrink === drink.originalIndex;

                return (
                  <Pressable
                    key={drink.loopKey}
                    style={[
                      styles.drinkItem,
                      active && styles.selectedDrinkItem,
                    ]}
                    onPress={() => setSelectedDrink(drink.originalIndex)}
                  >
                    <View
                      style={[
                        styles.drinkCircle,
                        active && styles.drinkCircleActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.drinkEmoji,
                          active && styles.activeDrinkEmoji,
                        ]}
                      >
                        {drink.emoji}
                      </Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.drinkName,
                        active && styles.drinkNameActive,
                      ]}
                    >
                      {drink.short}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Ionicons
              name="chevron-forward"
              size={21}
              color={COLORS.charcoal}
            />
          </View>

          {/* MAIN SELECTED DRINK / CAMERA ACTION */}

          <View style={styles.primaryDrinkWrapper}>
            <Pressable
              style={styles.primaryDrinkButton}
              onPress={() => {
                // NEXT: open camera using expo-camera.
              }}
            >
              <Text style={styles.primaryDrinkEmoji}>
                {currentDrink.emoji}
              </Text>
            </Pressable>

            <Text style={styles.logText}>LOG</Text>
            <Text style={styles.havingText}>HAVING ONE</Text>
          </View>

          {/* NAV */}

          <View style={styles.bottomNav}>
            <BottomNavItem icon="location" label="Map" active />

            <BottomNavItem
              icon="people-outline"
              label="Friends"
              onPress={() => router.push("/friends")}
            />

            <View style={styles.navSpacer} />

            <BottomNavItem icon="heart-outline" label="Activity" />
            <BottomNavItem
              icon="person-outline"
              label="Profile"
              onPress={() => router.push("/profile")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function UserMarker({ person }: { person: MapPerson }) {
  const recencyColor = getRecencyColor(person.minutesAgo);

  return (
    <View style={styles.markerWrapper}>
      <Text style={styles.markerName}>{person.nickname}</Text>

      <Text style={styles.markerStatus}>{getHavingText(person)}</Text>

      <Text style={styles.markerTime}>{person.time}</Text>

      <View style={styles.markerContent}>
        {person.friend ? (
          <View
            style={[
              styles.avatarBorder,
              {
                borderColor: recencyColor,
              },
            ]}
          >
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>{person.avatar}</Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.unknownAvatar,
              {
                borderColor: recencyColor,
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={27}
              color="#92979A"
            />
          </View>
        )}

        <GenericDrinkIcon
          type={person.drinkType}
          minutesAgo={person.minutesAgo}
        />
      </View>

      {person.nickname === "You" && (
        <View style={styles.userLocationDot} />
      )}
    </View>
  );
}

function GenericDrinkIcon({
  type,
  minutesAgo,
}: {
  type: DrinkType;
  minutesAgo: number;
}) {
  const level = getFillLevel(minutesAgo);
  const fillHeight = level === "full" ? "82%" : level === "half" ? "44%" : "0%";
  //const fillColor = getRecencyColor(minutesAgo);
    const fillColor = COLORS.beerGold;

  if (type === "wine") {
    return (
      <View style={styles.genericDrinkWrap}>
        <View style={styles.wineCup}>
          <View
            style={[
              styles.drinkLiquid,
              {
                height: fillHeight,
                backgroundColor: fillColor,
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
                backgroundColor: fillColor,
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
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
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
        color={active ? COLORS.mintStrong : COLORS.charcoal}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },

  container: {
    flex: 1,
  },

  /* Top */

  topControls: {
    position: "absolute",
    top: 12,
    left: 18,
    right: 18,
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  notificationBadge: {
    position: "absolute",
    right: -1,
    top: -3,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: COLORS.red,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.paper,
  },

  notificationBadgeText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    color: COLORS.paper,
  },

  filterControl: {
    flexDirection: "row",
    borderRadius: 999,
    padding: 3,
    backgroundColor: "rgba(255,255,255,0.94)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  filterButton: {
    minWidth: 78,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonSelected: {
    backgroundColor: COLORS.mint,
  },

  filterText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  filterTextSelected: {
    color: COLORS.paper,
  },

  /* Marker */

  markerWrapper: {
    minWidth: 88,
    alignItems: "center",
  },

  markerName: {
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    lineHeight: 16,
    color: COLORS.charcoal,
  },

  markerStatus: {
    marginTop: 1,
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    lineHeight: 12,
    color: COLORS.darkGrey,
  },

  markerTime: {
    marginTop: 1,
    marginBottom: 3,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    lineHeight: 10,
    color: COLORS.charcoal,
  },

  markerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarBorder: {
    width: 49,
    height: 49,
    borderRadius: 25,
    borderWidth: 3,
    padding: 2,
    backgroundColor: COLORS.paper,
  },

  avatarCircle: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: "#E8E0D5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarEmoji: {
    fontSize: 29,
  },

  unknownAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: COLORS.paper,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },

  genericDrinkWrap: {
    width: 20,
    height: 31,
    marginLeft: 5,
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
    opacity: 0.9,
  },

  bottleNeck: {
    width: 6,
    height: 8,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.darkGrey,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  bottleBody: {
    width: 13,
    height: 22,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },

  wineCup: {
    width: 16,
    height: 17,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
    position: "relative",
  },

  wineStem: {
    width: 1,
    height: 8,
    backgroundColor: COLORS.darkGrey,
  },

  wineBase: {
    width: 11,
    height: 1,
    backgroundColor: COLORS.darkGrey,
  },

  beerMug: {
    width: 14,
    height: 23,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderRadius: 2,
    overflow: "hidden",
    position: "relative",
  },

  beerHandle: {
    position: "absolute",
    right: 0,
    bottom: 5,
    width: 6,
    height: 12,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: COLORS.darkGrey,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  userLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#2689FF",
    borderWidth: 2,
    borderColor: COLORS.paper,
  },

  /* Location */

  locationButton: {
    position: "absolute",
    right: 18,
    bottom: 183,
    zIndex: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },

  /* Friend popup */

  friendSheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 180,
    zIndex: 40,
    backgroundColor: COLORS.paper,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 12,
    paddingTop: 7,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.17,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    elevation: 15,
  },

  friendSheetHandle: {
    alignSelf: "center",
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C6C8C7",
    marginBottom: 7,
  },

  friendHeader: {
    minHeight: 59,
    flexDirection: "row",
    alignItems: "center",
  },

  closeFriendButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },

  friendAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 3,
    backgroundColor: "#E9E2D8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  friendAvatarEmoji: {
    fontSize: 28,
  },

  friendHeaderInfo: {
    flex: 1,
    marginLeft: 8,
  },

  friendNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  friendName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
    color: COLORS.charcoal,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingHorizontal: 6,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.mintSoft,
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.mint,
    marginRight: 4,
  },

  liveText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 7,
    letterSpacing: 0.3,
    color: COLORS.mintStrong,
  },

  friendLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  friendLocation: {
    flexShrink: 1,
    marginLeft: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  friendMeta: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 8,
    color: COLORS.faint,
  },

  kaclinkButton: {
    minWidth: 78,
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.sunshine,
  },

  kaclinkButtonDone: {
    backgroundColor: COLORS.mintSoft,
  },

  kaclinkIcon: {
    fontSize: 15,
    marginRight: 4,
  },

  kaclinkButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 10,
    color: COLORS.charcoal,
  },

  friendPhoto: {
    width: "100%",
    height: 178,
    borderRadius: 11,
    backgroundColor: "#ECECEC",
  },

  friendPhotoPlaceholder: {
    width: "100%",
    height: 178,
    borderRadius: 11,
    backgroundColor: "#F3F3F1",
    alignItems: "center",
    justifyContent: "center",
  },

  friendPhotoPlaceholderText: {
    marginTop: 6,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.faint,
  },

  kaclinkSummary: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
  },

  kaclinkCountBlock: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 72,
  },

  kaclinkSummaryIcon: {
    fontSize: 20,
    marginRight: 5,
  },

  kaclinkCount: {
    fontFamily: "DMSans_700Bold",
    fontSize: 13,
    lineHeight: 14,
    color: COLORS.charcoal,
  },

  kaclinkLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 7,
    color: COLORS.darkGrey,
  },

  kaclinkPeople: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 6,
  },

  miniReactionAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.paper,
    backgroundColor: "#ECE4DA",
    alignItems: "center",
    justifyContent: "center",
  },

  miniReactionOverlap: {
    marginLeft: -7,
  },

  miniReactionEmoji: {
    fontSize: 14,
  },

  reactionCopy: {
    flex: 1,
    marginLeft: 6,
    fontFamily: "DMSans_400Regular",
    fontSize: 7.5,
    lineHeight: 10,
    color: COLORS.darkGrey,
  },

  summaryNext: {
    width: 29,
    height: 29,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  friendDrinkRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 7,
  },

  friendDrinkInfo: {
    flex: 1,
    marginLeft: 5,
  },

  friendDrinkName: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },

  friendDrinkSub: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8,
    color: COLORS.darkGrey,
  },

  moreButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Bottom tray */

  bottomPanel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 12,
  },

  dragHandle: {
    alignSelf: "center",
    width: 38,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: "#A9ADAF",
  },

  drinkTray: {
    height: 76,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  drinkScroll: {
    alignItems: "center",
  },

  drinkItem: {
    width: CAROUSEL_ITEM_WIDTH,
    alignItems: "center",
  },

  selectedDrinkItem: {
    opacity: 0,
  },

  drinkCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: "#F7F4EA",
    alignItems: "center",
    justifyContent: "center",
  },

  drinkCircleActive: {
    borderColor: COLORS.mint,
  },

  drinkEmoji: {
    fontSize: 23,
  },

  activeDrinkEmoji: {
    fontSize: 26,
  },

  drinkName: {
    marginTop: 3,
    fontFamily: "DMSans_500Medium",
    fontSize: 7.5,
    color: COLORS.charcoal,
  },

  drinkNameActive: {
    color: COLORS.mintStrong,
  },

  /* Main drink */

  primaryDrinkWrapper: {
    position: "absolute",
    alignItems: "center",
    top: 14,
    left: width / 2 - 39,
    zIndex: 30,
  },

  primaryDrinkButton: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: COLORS.paper,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
  },

  primaryDrinkEmoji: {
    fontSize: 39,
  },

  logText: {
    marginTop: 2,
    fontFamily: "DMSans_700Bold",
    fontSize: 9,
    letterSpacing: 0.7,
    color: COLORS.mintStrong,
  },

  havingText: {
    marginTop: -1,
    fontFamily: "DMSans_500Medium",
    fontSize: 8,
    letterSpacing: 0.4,
    color: COLORS.mintStrong,
  },

  /* Bottom nav */

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 61,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.paper,
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
});