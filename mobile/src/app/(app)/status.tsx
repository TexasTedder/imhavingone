import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85";

export default function StatusScreen() {
  const params = useLocalSearchParams();

  const nickname =
    typeof params.nickname === "string"
      ? params.nickname
      : "Mike";

  const time =
    typeof params.time === "string"
      ? params.time
      : "14:20";

  const drinkName =
    typeof params.drinkName === "string"
      ? params.drinkName
      : "Heineken Silver";

  const location =
    typeof params.location === "string"
      ? params.location
      : "Location hidden";

  const avatar =
    typeof params.avatar === "string"
      ? params.avatar
      : "😎";

  const photo =
    typeof params.photo === "string" && params.photo.length > 0
      ? params.photo
      : DEFAULT_PHOTO;

  const initialKaclinks =
    typeof params.kaclinks === "string"
      ? Number(params.kaclinks)
      : 25;

  const minutesAgo =
    typeof params.minutesAgo === "string"
      ? Number(params.minutesAgo)
      : 10;

  const [hasKaclinked, setHasKaclinked] =
    useState(false);

  const kaclinkCount =
    initialKaclinks + (hasKaclinked ? 1 : 0);

  const isLive = minutesAgo <= 15;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={COLORS.charcoal}
            />
          </Pressable>

          <View style={styles.headerCentre}>
            <Text style={styles.headerTitle}>
              Having One
            </Text>

            <Text style={styles.headerSub}>
              {time} · {minutesAgo} min ago
            </Text>
          </View>

          <Pressable style={styles.headerButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={22}
              color={COLORS.charcoal}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* USER */}

          <View style={styles.userRow}>
            <View
              style={[
                styles.avatarBorder,
                {
                  borderColor: isLive
                    ? COLORS.mint
                    : COLORS.sunshine,
                },
              ]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>
                  {avatar}
                </Text>
              </View>
            </View>

            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nickname}>
                  {nickname}
                </Text>

                {isLive && (
                  <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>
                      LIVE
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.locationText}>
                {location}
              </Text>
            </View>
          </View>

          {/* PHOTO */}

          <View style={styles.photoCard}>
            <Image
              source={{ uri: photo }}
              style={styles.photo}
              resizeMode="cover"
            />

            <View style={styles.photoOverlay}>
              <View style={styles.photoDrinkPill}>
                <Text style={styles.photoDrinkEmoji}>
                  🍺
                </Text>

                <Text style={styles.photoDrinkText}>
                  {drinkName}
                </Text>
              </View>
            </View>
          </View>

          {/* KACLINK */}

          <View style={styles.reactionCard}>
            <View style={styles.kaclinkSummary}>
              <Text style={styles.kaclinkEmoji}>
                🍻
              </Text>

              <View>
                <Text style={styles.kaclinkCount}>
                  {kaclinkCount}
                </Text>

                <Text style={styles.kaclinkLabel}>
                  KaClinks
                </Text>
              </View>
            </View>

            <Pressable
              style={[
                styles.kaclinkButton,
                hasKaclinked &&
                  styles.kaclinkButtonDone,
              ]}
              onPress={() =>
                setHasKaclinked((current) => !current)
              }
            >
              <Text style={styles.kaclinkButtonEmoji}>
                🍻
              </Text>

              <Text style={styles.kaclinkButtonText}>
                {hasKaclinked
                  ? "KaClinked"
                  : "KaClink"}
              </Text>
            </Pressable>
          </View>

          {/* WHO KACLINKED */}

          <Pressable
            style={styles.peopleCard}
            onPress={() => router.push("/kaclinks")}
          >
            <View style={styles.miniAvatars}>
              <View style={styles.miniAvatar}>
                <Text style={styles.miniEmoji}>
                  👨🏻
                </Text>
              </View>

              <View
                style={[
                  styles.miniAvatar,
                  styles.avatarOverlap,
                ]}
              >
                <Text style={styles.miniEmoji}>
                  👩🏻
                </Text>
              </View>

              <View
                style={[
                  styles.miniAvatar,
                  styles.avatarOverlap,
                ]}
              >
                <Text style={styles.miniEmoji}>
                  🧔🏽
                </Text>
              </View>
            </View>

            <View style={styles.peopleInfo}>
              <Text style={styles.peopleTitle}>
                See who KaClinked
              </Text>

              <Text style={styles.peopleCopy}>
                Jess, Alex and{" "}
                {Math.max(kaclinkCount - 2, 0)} others
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={COLORS.faint}
            />
          </Pressable>

          {/* DRINK DETAIL */}

          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>
              WHAT I'M HAVING
            </Text>

            <View style={styles.drinkCard}>
              <View style={styles.drinkIcon}>
                <Text style={styles.drinkEmoji}>
                  🍺
                </Text>
              </View>

              <View style={styles.drinkInfo}>
                <Text style={styles.drinkName}>
                  {drinkName}
                </Text>

                <Text style={styles.drinkCopy}>
                  That’s what I’m having!
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.faint}
              />
            </View>
          </View>

          {/* COMMENTS — FUTURE READY */}

          <View style={styles.section}>
            <View style={styles.commentsHeading}>
              <View>
                <Text style={styles.sectionEyebrow}>
                  COMMENTS
                </Text>

                <Text style={styles.commentsTitle}>
                  Comments coming soon
                </Text>
              </View>

              <View style={styles.soonBadge}>
                <Text style={styles.soonText}>
                  SOON
                </Text>
              </View>
            </View>

            <View style={styles.commentsPlaceholder}>
              <View style={styles.commentIcon}>
                <Ionicons
                  name="chatbubble-outline"
                  size={22}
                  color={COLORS.mintStrong}
                />
              </View>

              <View style={styles.commentPlaceholderInfo}>
                <Text style={styles.commentPlaceholderTitle}>
                  Say something about this one
                </Text>

                <Text style={styles.commentPlaceholderCopy}>
                  We'll wire comments once the core
                  Having One flow is complete.
                </Text>
              </View>
            </View>
          </View>

          {/* PRIVACY */}

          <View style={styles.privacyNote}>
            <Ionicons
              name="shield-checkmark-outline"
              size={17}
              color={COLORS.mintStrong}
            />

            <Text style={styles.privacyText}>
              Instant photos and location details
              follow the user's privacy settings.
            </Text>
          </View>

          <View style={{ height: 34 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
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
    height: 66,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.paper,
  },

  headerCentre: {
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  headerSub: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.faint,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
  },

  userRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarBorder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    padding: 2,
    backgroundColor: COLORS.paper,
  },

  avatar: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: "#EAE2D8",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  avatarEmoji: {
    fontSize: 30,
  },

  userInfo: {
    flex: 1,
    marginLeft: 11,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nickname: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: COLORS.charcoal,
  },

  liveBadge: {
    height: 19,
    marginLeft: 7,
    paddingHorizontal: 7,
    borderRadius: 10,
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

  locationText: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: COLORS.darkGrey,
  },

  photoCard: {
    width: "100%",
    aspectRatio: 0.88,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: COLORS.softBackground,
    position: "relative",
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  photoOverlay: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
  },

  photoDrinkPill: {
    alignSelf: "flex-start",
    height: 34,
    paddingHorizontal: 11,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.94)",
    flexDirection: "row",
    alignItems: "center",
  },

  photoDrinkEmoji: {
    fontSize: 16,
  },

  photoDrinkText: {
    marginLeft: 6,
    fontFamily: "DMSans_700Bold",
    fontSize: 9.5,
    color: COLORS.charcoal,
  },

  reactionCard: {
    minHeight: 76,
    marginTop: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  kaclinkSummary: {
    flexDirection: "row",
    alignItems: "center",
  },

  kaclinkEmoji: {
    fontSize: 26,
    marginRight: 8,
  },

  kaclinkCount: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
    lineHeight: 18,
    color: COLORS.charcoal,
  },

  kaclinkLabel: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  kaclinkButton: {
    minWidth: 105,
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 13,
    backgroundColor: COLORS.sunshine,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  kaclinkButtonDone: {
    backgroundColor: COLORS.mintSoft,
  },

  kaclinkButtonEmoji: {
    fontSize: 17,
    marginRight: 5,
  },

  kaclinkButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: COLORS.charcoal,
  },

  peopleCard: {
    minHeight: 68,
    marginTop: 9,
    paddingHorizontal: 13,
    borderRadius: 17,
    backgroundColor: COLORS.softBackground,
    flexDirection: "row",
    alignItems: "center",
  },

  miniAvatars: {
    flexDirection: "row",
    alignItems: "center",
  },

  miniAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.paper,
    backgroundColor: "#EAE2D8",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarOverlap: {
    marginLeft: -8,
  },

  miniEmoji: {
    fontSize: 17,
  },

  peopleInfo: {
    flex: 1,
    marginLeft: 10,
  },

  peopleTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },

  peopleCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  section: {
    marginTop: 24,
  },

  sectionEyebrow: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1,
    color: COLORS.mintStrong,
  },

  drinkCard: {
    minHeight: 70,
    marginTop: 8,
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  drinkIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  drinkEmoji: {
    fontSize: 23,
  },

  drinkInfo: {
    flex: 1,
    marginLeft: 11,
  },

  drinkName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  drinkCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  commentsHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  commentsTitle: {
    marginTop: 3,
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  soonBadge: {
    height: 22,
    paddingHorizontal: 9,
    borderRadius: 11,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  soonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 7,
    letterSpacing: 0.8,
    color: COLORS.mintStrong,
  },

  commentsPlaceholder: {
    minHeight: 74,
    marginTop: 10,
    paddingHorizontal: 13,
    borderRadius: 17,
    backgroundColor: COLORS.softBackground,
    flexDirection: "row",
    alignItems: "center",
  },

  commentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  commentPlaceholderInfo: {
    flex: 1,
    marginLeft: 11,
  },

  commentPlaceholderTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },

  commentPlaceholderCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    lineHeight: 12,
    color: COLORS.faint,
  },

  privacyNote: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  privacyText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    lineHeight: 12,
    color: COLORS.darkGrey,
  },
});