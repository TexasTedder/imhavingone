import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
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

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "grid-outline",
  },
  {
    id: "brands",
    label: "Brands",
    icon: "pricetag-outline",
    route: "/brands",
  },
  {
    id: "users",
    label: "Users",
    icon: "people-outline",
  },
  {
    id: "stats",
    label: "Stats",
    icon: "bar-chart-outline",
  },
  {
    id: "contracts",
    label: "Contracts",
    icon: "document-text-outline",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings-outline",
  },
];

const DASHBOARD_STATS = [
  {
    id: "users",
    label: "Total Users",
    value: "12,842",
    icon: "people-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "having",
    label: "Having One Now",
    value: "328",
    icon: "radio-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "photos",
    label: "Photos",
    value: "84.2k",
    icon: "camera-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "kaclinks",
    label: "KaClinks",
    value: "216k",
    icon: "heart-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "brands",
    label: "Active Brands",
    value: "18",
    icon: "pricetag-outline" as keyof typeof Ionicons.glyphMap,
  },
  {
    id: "contracts",
    label: "Active Contracts",
    value: "7",
    icon: "document-text-outline" as keyof typeof Ionicons.glyphMap,
  },
];

export default function AdminScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItem = (item: MenuItem) => {
    setMenuOpen(false);

    if (item.route) {
      router.push(item.route as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* MAIN PAGE */}

        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>IMHAVINGONE</Text>
            <Text style={styles.title}>Admin</Text>
            <Text style={styles.subtitle}>
              Platform overview
            </Text>
          </View>

          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuOpen(true)}
          >
            <Ionicons
              name="menu"
              size={24}
              color={COLORS.charcoal}
            />
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* STATUS */}

          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <View style={styles.liveDot} />
            </View>

            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                Platform live
              </Text>

              <Text style={styles.statusCopy}>
                ImHavingOne services are running normally.
              </Text>
            </View>

            <Text style={styles.statusBadge}>
              LIVE
            </Text>
          </View>

          {/* DASHBOARD HEADING */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Dashboard
              </Text>

              <Text style={styles.sectionCopy}>
                Current platform activity
              </Text>
            </View>

            <Pressable style={styles.refreshButton}>
              <Ionicons
                name="refresh-outline"
                size={18}
                color={COLORS.charcoal}
              />
            </Pressable>
          </View>

          {/* STATS */}

          <View style={styles.statsGrid}>
            {DASHBOARD_STATS.map((item) => (
              <View
                key={item.id}
                style={styles.statCard}
              >
                <View style={styles.statTop}>
                  <View style={styles.statIcon}>
                    <Ionicons
                      name={item.icon}
                      size={19}
                      color={COLORS.mintStrong}
                    />
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={15}
                    color={COLORS.faint}
                  />
                </View>

                <Text style={styles.statValue}>
                  {item.value}
                </Text>

                <Text style={styles.statLabel}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* QUICK ACTIONS */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Quick actions
              </Text>

              <Text style={styles.sectionCopy}>
                Manage the most important areas
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.quickActionCard}
            onPress={() => router.push("/brands" as never)}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons
                name="pricetag-outline"
                size={23}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.quickActionInfo}>
              <Text style={styles.quickActionTitle}>
                Brand Management
              </Text>

              <Text style={styles.quickActionCopy}>
                Add, edit, activate or hide brands.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.charcoal}
            />
          </Pressable>

          <Pressable style={styles.quickActionCard}>
            <View style={styles.quickActionIcon}>
              <Ionicons
                name="people-outline"
                size={23}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.quickActionInfo}>
              <Text style={styles.quickActionTitle}>
                User Management
              </Text>

              <Text style={styles.quickActionCopy}>
                Search, review and manage users.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.faint}
            />
          </Pressable>

          <Pressable style={styles.quickActionCard}>
            <View style={styles.quickActionIcon}>
              <Ionicons
                name="document-text-outline"
                size={23}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.quickActionInfo}>
              <Text style={styles.quickActionTitle}>
                Contracts
              </Text>

              <Text style={styles.quickActionCopy}>
                Review brand contracts and billing periods.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.faint}
            />
          </Pressable>

          {/* RECENT ACTIVITY */}

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Recent activity
              </Text>

              <Text style={styles.sectionCopy}>
                Latest admin-relevant events
              </Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <ActivityRow
              icon="person-add-outline"
              title="128 new users"
              copy="Registered in the last 24 hours"
            />

            <ActivityRow
              icon="camera-outline"
              title="1,842 new photos"
              copy="Logged today"
            />

            <ActivityRow
              icon="pricetag-outline"
              title="Heineken"
              copy="Brand contract expires in 12 days"
              last
            />
          </View>

          <View style={{ height: 28 }} />
        </ScrollView>

        {/* DRAWER OVERLAY */}

        {menuOpen && (
          <View style={styles.drawerOverlay}>
            <Pressable
              style={styles.drawerBackdrop}
              onPress={() => setMenuOpen(false)}
            />

            <View style={styles.drawer}>
              <View style={styles.drawerHeader}>
                <View>
                  <Text style={styles.drawerEyebrow}>
                    IMHAVINGONE
                  </Text>

                  <Text style={styles.drawerTitle}>
                    Admin
                  </Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setMenuOpen(false)}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color={COLORS.charcoal}
                  />
                </Pressable>
              </View>

              <View style={styles.adminProfile}>
                <View style={styles.adminAvatar}>
                  <Ionicons
                    name="person"
                    size={25}
                    color={COLORS.mintStrong}
                  />
                </View>

                <View>
                  <Text style={styles.adminName}>
                    Admin User
                  </Text>

                  <Text style={styles.adminRole}>
                    Super Admin
                  </Text>
                </View>
              </View>

              <View style={styles.menuList}>
                {MENU_ITEMS.map((item) => {
                  const active =
                    item.id === "dashboard";

                  return (
                    <Pressable
                      key={item.id}
                      style={[
                        styles.menuItem,
                        active && styles.menuItemActive,
                      ]}
                      onPress={() =>
                        handleMenuItem(item)
                      }
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={
                          active
                            ? COLORS.mintStrong
                            : COLORS.charcoal
                        }
                      />

                      <Text
                        style={[
                          styles.menuItemText,
                          active &&
                            styles.menuItemTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>

                      {item.route && (
                        <Ionicons
                          name="chevron-forward"
                          size={16}
                          color={COLORS.faint}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.drawerFooter}>
                <Pressable
                  style={styles.returnButton}
                  onPress={() => router.push("/map" as never)}
                >
                  <Ionicons
                    name="arrow-back-outline"
                    size={18}
                    color={COLORS.charcoal}
                  />

                  <Text style={styles.returnButtonText}>
                    Return to App
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function ActivityRow({
  icon,
  title,
  copy,
  last = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  copy: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.activityRow,
        last && styles.activityRowLast,
      ]}
    >
      <View style={styles.activityIcon}>
        <Ionicons
          name={icon}
          size={18}
          color={COLORS.mintStrong}
        />
      </View>

      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>
          {title}
        </Text>

        <Text style={styles.activityCopy}>
          {copy}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={16}
        color={COLORS.faint}
      />
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
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eyebrow: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.4,
    color: COLORS.mintStrong,
  },

  title: {
    marginTop: 2,
    fontFamily: "DMSans_700Bold",
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.1,
    color: COLORS.charcoal,
  },

  subtitle: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: COLORS.darkGrey,
  },

  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.paper,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
  },

  statusCard: {
    minHeight: 70,
    marginTop: 3,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.mint,
  },

  statusInfo: {
    flex: 1,
    marginLeft: 11,
  },

  statusTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 13,
    color: COLORS.charcoal,
  },

  statusCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.darkGrey,
  },

  statusBadge: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 0.8,
    color: COLORS.mintStrong,
  },

  sectionHeading: {
    marginTop: 24,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: COLORS.charcoal,
  },

  sectionCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
  },

  refreshButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },

  statCard: {
    width: "48.5%",
    minHeight: 122,
    borderRadius: 18,
    padding: 14,
    backgroundColor: COLORS.softBackground,
    borderWidth: 1,
    borderColor: COLORS.line,
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    marginTop: 13,
    fontFamily: "DMSans_700Bold",
    fontSize: 25,
    letterSpacing: -0.7,
    color: COLORS.charcoal,
  },

  statLabel: {
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
    fontSize: 9.5,
    color: COLORS.darkGrey,
  },

  quickActionCard: {
    minHeight: 72,
    marginBottom: 9,
    paddingHorizontal: 13,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.paper,
  },

  quickActionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  quickActionInfo: {
    flex: 1,
    marginLeft: 11,
  },

  quickActionTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12.5,
    color: COLORS.charcoal,
  },

  quickActionCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.darkGrey,
  },

  activityCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
    overflow: "hidden",
  },

  activityRow: {
    minHeight: 68,
    paddingHorizontal: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  activityRowLast: {
    borderBottomWidth: 0,
  },

  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
    marginLeft: 10,
  },

  activityTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 11.5,
    color: COLORS.charcoal,
  },

  activityCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.faint,
  },

  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    flexDirection: "row",
  },

  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35,38,43,0.38)",
  },

  drawer: {
    width: "82%",
    height: "100%",
    backgroundColor: COLORS.paper,
    paddingTop: 20,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    elevation: 20,
  },

  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  drawerEyebrow: {
    fontFamily: "DMSans_700Bold",
    fontSize: 8,
    letterSpacing: 1.3,
    color: COLORS.mintStrong,
  },

  drawerTitle: {
    marginTop: 2,
    fontFamily: "DMSans_700Bold",
    fontSize: 28,
    color: COLORS.charcoal,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: "center",
    justifyContent: "center",
  },

  adminProfile: {
    minHeight: 72,
    marginTop: 22,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  adminAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  adminName: {
    marginLeft: 10,
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  adminRole: {
    marginLeft: 10,
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.darkGrey,
  },

  menuList: {
    marginTop: 22,
  },

  menuItem: {
    minHeight: 52,
    paddingHorizontal: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  menuItemActive: {
    backgroundColor: COLORS.mintSoft,
  },

  menuItemText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  menuItemTextActive: {
    fontFamily: "DMSans_700Bold",
    color: COLORS.mintStrong,
  },

  drawerFooter: {
    marginTop: "auto",
    paddingBottom: 25,
  },

  returnButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  returnButtonText: {
    marginLeft: 7,
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: COLORS.charcoal,
  },
});