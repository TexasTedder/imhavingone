import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
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

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Profile</Text>

            <Text style={styles.subtitle}>
              Your ImHavingOne account.
            </Text>
          </View>

          <Pressable style={styles.headerButton}>
            <Ionicons
              name="settings-outline"
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
          {/* PROFILE HERO */}

          <View style={styles.profileCard}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>
                  😎
                </Text>
              </View>

              <Pressable style={styles.cameraButton}>
                <Ionicons
                  name="camera"
                  size={14}
                  color={COLORS.paper}
                />
              </Pressable>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nickname}>
                  Texas
                </Text>

                <View style={styles.verifiedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color={COLORS.mintStrong}
                  />

                  <Text style={styles.verifiedText}>
                    VERIFIED
                  </Text>
                </View>
              </View>

              <Text style={styles.fullName}>
                First Name Last Name
              </Text>

              <Text style={styles.mobile}>
                +27 82 ••• ••••
              </Text>
            </View>

            <Pressable style={styles.editProfileButton}>
              <Ionicons
                name="create-outline"
                size={18}
                color={COLORS.charcoal}
              />
            </Pressable>
          </View>

          {/* MINI STATS */}

          <View style={styles.statsRow}>
            <StatCard
              value="128"
              label="Having Ones"
            />

            <StatCard
              value="342"
              label="KaClinks"
            />

            <StatCard
              value="48"
              label="Friends"
            />
          </View>

          {/* FAVOURITE DRINKS */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Favourite Drinks
              </Text>

              <Text style={styles.sectionCopy}>
                These appear first in your drink tray.
              </Text>
            </View>

            <Pressable style={styles.smallEditButton}>
              <Text style={styles.smallEditText}>
                Edit
              </Text>
            </Pressable>
          </View>

          <View style={styles.drinksCard}>
            <DrinkRow
              emoji="🍺"
              name="Heineken"
              count="128"
              first
            />

            <DrinkRow
              emoji="🍺"
              name="Guinness"
              count="87"
            />

            <DrinkRow
              emoji="🍷"
              name="Red Wine"
              count="64"
            />
          </View>

          {/* LOCATION + PRIVACY */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Location & Privacy
              </Text>

              <Text style={styles.sectionCopy}>
                Control what other users can see.
              </Text>
            </View>
          </View>

          <View style={styles.settingsCard}>
            <SettingRow
              icon="location-outline"
              title="Map Location"
              copy="Balanced · approximately 500 m"
              value="Balanced"
            />

            <SettingRow
              icon="people-outline"
              title="Who can see me"
              copy="Friends see your full Having One status"
              value="Friends"
            />

            <SettingRow
              icon="eye-off-outline"
              title="Unknown Users"
              copy="Limited profile and approximate location"
              value="Limited"
              last
            />
          </View>

          {/* NOTIFICATIONS */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Notifications
              </Text>

              <Text style={styles.sectionCopy}>
                Choose what you want to hear about.
              </Text>
            </View>
          </View>

          <View style={styles.settingsCard}>
            <SettingRow
              icon="notifications-outline"
              title="Push Notifications"
              copy="KaClinks, friend requests and activity"
              value="On"
            />

            <SettingRow
              icon="beer-outline"
              title="Friend Activity"
              copy="Know when selected friends are Having One"
              value="On"
              last
            />
          </View>

          {/* ACCOUNT */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Account
              </Text>

              <Text style={styles.sectionCopy}>
                Mobile, password and account security.
              </Text>
            </View>
          </View>

          <View style={styles.settingsCard}>
            <Pressable style={styles.accountRow}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color={COLORS.mintStrong}
                />
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>
                  Mobile Number
                </Text>

                <Text style={styles.settingCopy}>
                  +27 82 ••• •••• · Verified
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.faint}
              />
            </Pressable>

            <View style={styles.rowDivider} />

            <Pressable
              style={styles.accountRow}
              onPress={() =>
                router.push("/reset-password")
              }
            >
              <View style={styles.settingIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.mintStrong}
                />
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>
                  Change Password
                </Text>

                <Text style={styles.settingCopy}>
                  Update your account password
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={COLORS.faint}
              />
            </Pressable>

            <View style={styles.rowDivider} />

            <SettingRow
              icon="moon-outline"
              title="Appearance"
              copy="Light mode"
              value="Light"
              last
            />
          </View>

          {/* LEGAL */}

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Support & Legal
            </Text>
          </View>

          <View style={styles.settingsCard}>
            <SimpleRow
              icon="help-circle-outline"
              title="Help & Support"
            />

            <SimpleRow
              icon="shield-checkmark-outline"
              title="Privacy Policy"
            />

            <SimpleRow
              icon="document-text-outline"
              title="Terms of Use"
              last
            />
          </View>

          {/* LOG OUT */}

          <Pressable
            style={styles.logoutButton}
            onPress={() =>
              router.replace("/welcome")
            }
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color={COLORS.red}
            />

            <Text style={styles.logoutText}>
              Log Out
            </Text>
          </Pressable>

          <Pressable style={styles.deleteButton}>
            <Text style={styles.deleteText}>
              Delete Account
            </Text>
          </Pressable>

          <Text style={styles.versionText}>
            ImHavingOne · Version 1.0
          </Text>

          <View style={{ height: 105 }} />
        </ScrollView>

        {/* BOTTOM NAV */}

        <View style={styles.bottomNav}>
          <BottomNavItem
            icon="location"
            label="Map"
            onPress={() => router.push("/map")}
          />

          <BottomNavItem
            icon="people-outline"
            label="Friends"
            onPress={() => router.push("/friends")}
          />

          <View style={styles.navSpacer} />

          <BottomNavItem
            icon="heart-outline"
            label="Activity"
          />

          <BottomNavItem
            icon="person"
            label="Profile"
            active
          />
        </View>

        {/* CENTRE LOG BUTTON */}

        <View style={styles.centerActionWrapper}>
          <Pressable
            style={styles.centerAction}
            onPress={() => router.push("/map")}
          >
            <Text style={styles.centerActionEmoji}>
              🍺
            </Text>
          </Pressable>

          <Text style={styles.centerActionTop}>
            LOG
          </Text>

          <Text style={styles.centerActionBottom}>
            HAVING ONE
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function DrinkRow({
  emoji,
  name,
  count,
  first = false,
}: {
  emoji: string;
  name: string;
  count: string;
  first?: boolean;
}) {
  return (
    <View
      style={[
        styles.drinkRow,
        !first && styles.drinkRowBorder,
      ]}
    >
      <View style={styles.drinkIcon}>
        <Text style={styles.drinkEmoji}>
          {emoji}
        </Text>
      </View>

      <Text style={styles.drinkName}>
        {name}
      </Text>

      <View style={styles.drinkCount}>
        <Text style={styles.drinkCountValue}>
          {count}
        </Text>

        <Text style={styles.drinkCountLabel}>
          Having Ones
        </Text>
      </View>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  copy,
  value,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  copy: string;
  value: string;
  last?: boolean;
}) {
  return (
    <>
      <Pressable style={styles.settingRow}>
        <View style={styles.settingIcon}>
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.mintStrong}
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            {title}
          </Text>

          <Text style={styles.settingCopy}>
            {copy}
          </Text>
        </View>

        <Text style={styles.settingValue}>
          {value}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={17}
          color={COLORS.faint}
        />
      </Pressable>

      {!last && (
        <View style={styles.rowDivider} />
      )}
    </>
  );
}

function SimpleRow({
  icon,
  title,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  last?: boolean;
}) {
  return (
    <>
      <Pressable style={styles.simpleRow}>
        <View style={styles.settingIcon}>
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.mintStrong}
          />
        </View>

        <Text style={styles.simpleTitle}>
          {title}
        </Text>

        <Ionicons
          name="chevron-forward"
          size={17}
          color={COLORS.faint}
        />
      </Pressable>

      {!last && (
        <View style={styles.rowDivider} />
      )}
    </>
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
    paddingBottom: 14,
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
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: COLORS.darkGrey,
  },

  headerButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  profileCard: {
    minHeight: 96,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarOuter: {
    width: 66,
    height: 66,
    position: "relative",
  },

  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: COLORS.mint,
    backgroundColor: "#EAE2D8",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarEmoji: {
    fontSize: 38,
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -1,
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.paper,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 12,
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

  verifiedBadge: {
    height: 21,
    marginLeft: 7,
    paddingHorizontal: 7,
    borderRadius: 11,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  verifiedText: {
    marginLeft: 3,
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    color: COLORS.mintStrong,
  },

  fullName: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: COLORS.darkGrey,
  },

  mobile: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.faint,
  },

  editProfileButton: {
    width: 37,
    height: 37,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  statsRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },

  statCard: {
    flex: 1,
    minHeight: 64,
    borderRadius: 16,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontFamily: "DMSans_700Bold",
    fontSize: 19,
    color: COLORS.charcoal,
  },

  statLabel: {
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: COLORS.darkGrey,
  },

  sectionHeading: {
    marginTop: 24,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
    color: COLORS.charcoal,
  },

  sectionCopy: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 10.5,
    color: COLORS.faint,
  },

  smallEditButton: {
    height: 32,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  smallEditText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: COLORS.mintStrong,
  },

  drinksCard: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    overflow: "hidden",
  },

  drinkRow: {
    minHeight: 64,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  drinkRowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.line,
  },

  drinkIcon: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  drinkEmoji: {
    fontSize: 21,
  },

  drinkName: {
    flex: 1,
    marginLeft: 11,
    fontFamily: "DMSans_700Bold",
    fontSize: 12.5,
    color: COLORS.charcoal,
  },

  drinkCount: {
    alignItems: "flex-end",
  },

  drinkCountValue: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  drinkCountLabel: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
  },

  settingsCard: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    overflow: "hidden",
  },

  settingRow: {
    minHeight: 70,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  accountRow: {
    minHeight: 70,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  settingInfo: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 6,
  },

  settingTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  settingCopy: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    lineHeight: 14,
    color: COLORS.faint,
  },

  settingValue: {
    marginRight: 6,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 10,
    color: COLORS.mintStrong,
  },

  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 62,
    backgroundColor: COLORS.line,
  },

  simpleRow: {
    minHeight: 62,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  simpleTitle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  logoutButton: {
    height: 50,
    marginTop: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.red,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    marginLeft: 6,
    fontFamily: "DMSans_700Bold",
    fontSize: 11.5,
    color: COLORS.red,
  },

  deleteButton: {
    height: 42,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 10.5,
    color: COLORS.red,
  },

  versionText: {
    marginTop: 13,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
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
    fontSize: 9.5,
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
    fontSize: 8.5,
    letterSpacing: 0.4,
    color: COLORS.mintStrong,
  },

  centerActionBottom: {
    marginTop: -1,
    fontFamily: "DMSans_500Medium",
    fontSize: 7.5,
    letterSpacing: 0.1,
    color: COLORS.mintStrong,
  },
});