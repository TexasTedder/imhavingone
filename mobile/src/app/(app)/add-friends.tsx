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

type SuggestedFriend = {
  id: number;
  nickname: string;
  handle: string;
  avatar: string;
  mutualFriends: number;
  onImHavingOne: boolean;
};

const SUGGESTED: SuggestedFriend[] = [
  {
    id: 1,
    nickname: "Emma",
    handle: "@emma.fisher",
    avatar: "👩🏻",
    mutualFriends: 7,
    onImHavingOne: true,
  },
  {
    id: 2,
    nickname: "Sophie",
    handle: "@soph_leinberger",
    avatar: "👩🏼",
    mutualFriends: 7,
    onImHavingOne: true,
  },
  {
    id: 3,
    nickname: "Caity",
    handle: "@caitlyn_perch",
    avatar: "👸🏽",
    mutualFriends: 3,
    onImHavingOne: true,
  },
  {
    id: 4,
    nickname: "Joné",
    handle: "@jone_2010",
    avatar: "👩🏾",
    mutualFriends: 2,
    onImHavingOne: true,
  },
  {
    id: 5,
    nickname: "Sierra",
    handle: "@sierraniilsen",
    avatar: "👩🏻",
    mutualFriends: 2,
    onImHavingOne: true,
  },
  {
    id: 6,
    nickname: "Mirren",
    handle: "@miryyy",
    avatar: "🧑🏼",
    mutualFriends: 4,
    onImHavingOne: true,
  },
  {
    id: 7,
    nickname: "Bella",
    handle: "@isabella_s1308",
    avatar: "👩🏽",
    mutualFriends: 1,
    onImHavingOne: true,
  },
  {
    id: 8,
    nickname: "Grant",
    handle: "+27 82 •••• 8214",
    avatar: "🧔🏻",
    mutualFriends: 0,
    onImHavingOne: false,
  },
  {
    id: 9,
    nickname: "Sarah",
    handle: "+27 83 •••• 4917",
    avatar: "👩🏻",
    mutualFriends: 0,
    onImHavingOne: false,
  },
];

export default function AddFriendsScreen() {
  const [search, setSearch] = useState("");
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const visiblePeople = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return SUGGESTED;

    return SUGGESTED.filter(
      (person) =>
        person.nickname.toLowerCase().includes(value) ||
        person.handle.toLowerCase().includes(value)
    );
  }, [search]);

  const appUsers = visiblePeople.filter(
    (person) => person.onImHavingOne
  );

  const inviteContacts = visiblePeople.filter(
    (person) => !person.onImHavingOne
  );

  const toggleAdd = (id: number) => {
    setAddedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
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
            <Text style={styles.title}>Add Friends</Text>
            <Text style={styles.subtitle}>
              Find your people.
            </Text>
          </View>

          <Pressable style={styles.headerButton}>
            <Ionicons
              name="qr-code-outline"
              size={21}
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
            placeholder="Search name or nickname"
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

        {/* CONTACTS ACTION */}

        <Pressable style={styles.contactsCard}>
          <View style={styles.contactsIcon}>
            <Ionicons
              name="book-outline"
              size={21}
              color={COLORS.mintStrong}
            />
          </View>

          <View style={styles.contactsInfo}>
            <Text style={styles.contactsTitle}>
              Find friends from contacts
            </Text>

            <Text style={styles.contactsCopy}>
              See who you already know on ImHavingOne.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.faint}
          />
        </Pressable>

        {/* LIST */}

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {appUsers.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Find friends
                </Text>

                <Text style={styles.sectionHint}>
                  Suggested
                </Text>
              </View>

              {appUsers.map((person) => (
                <AddFriendRow
                  key={person.id}
                  person={person}
                  added={addedIds.includes(person.id)}
                  onAdd={() => toggleAdd(person.id)}
                />
              ))}
            </>
          )}

          {inviteContacts.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Invite contacts
                </Text>

                <Text style={styles.sectionHint}>
                  Not on ImHavingOne yet
                </Text>
              </View>

              {inviteContacts.map((person) => (
                <InviteRow
                  key={person.id}
                  person={person}
                />
              ))}
            </>
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
            onPress={() => router.push("/friends")}
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

        {/* CENTRE LOG BUTTON */}

        <View style={styles.centerActionWrapper}>
          <Pressable
            style={styles.centerAction}
            onPress={() => router.push("/map")}
          >
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

function AddFriendRow({
  person,
  added,
  onAdd,
}: {
  person: SuggestedFriend;
  added: boolean;
  onAdd: () => void;
}) {
  return (
    <View style={styles.friendRow}>
      <View style={styles.avatarBorder}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>
            {person.avatar}
          </Text>
        </View>
      </View>

      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>
          {person.nickname}
        </Text>

        <Text style={styles.friendHandle}>
          {person.handle}
        </Text>

        {person.mutualFriends > 0 && (
          <Text style={styles.mutualText}>
            {person.mutualFriends} mutual{" "}
            {person.mutualFriends === 1
              ? "friend"
              : "friends"}
          </Text>
        )}
      </View>

      <Pressable
        style={[
          styles.addButton,
          added && styles.addButtonDone,
        ]}
        onPress={onAdd}
      >
        <Ionicons
          name={
            added
              ? "checkmark"
              : "person-add-outline"
          }
          size={15}
          color={
            added
              ? COLORS.mintStrong
              : COLORS.paper
          }
        />

        <Text
          style={[
            styles.addButtonText,
            added && styles.addButtonTextDone,
          ]}
        >
          {added ? "Added" : "Add"}
        </Text>
      </Pressable>
    </View>
  );
}

function InviteRow({
  person,
}: {
  person: SuggestedFriend;
}) {
  return (
    <View style={styles.friendRow}>
      <View style={styles.avatarBorderInactive}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>
            {person.avatar}
          </Text>
        </View>
      </View>

      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>
          {person.nickname}
        </Text>

        <Text style={styles.friendHandle}>
          {person.handle}
        </Text>
      </View>

      <Pressable style={styles.inviteButton}>
        <Ionicons
          name="share-outline"
          size={14}
          color={COLORS.mintStrong}
        />

        <Text style={styles.inviteButtonText}>
          Invite
        </Text>
      </Pressable>
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

  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.9,
    color: COLORS.charcoal,
  },

  subtitle: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 12,
    color: COLORS.darkGrey,
  },

  headerButton: {
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

  contactsCard: {
    minHeight: 66,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 13,
    borderRadius: 17,
    backgroundColor: COLORS.mintSoft,
    flexDirection: "row",
    alignItems: "center",
  },

  contactsIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  contactsInfo: {
    flex: 1,
    marginLeft: 11,
  },

  contactsTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12.5,
    color: COLORS.charcoal,
  },

  contactsCopy: {
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.darkGrey,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 20,
  },

  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    color: COLORS.charcoal,
  },

  sectionHint: {
    fontFamily: "DMSans_400Regular",
    fontSize: 9,
    color: COLORS.faint,
  },

  friendRow: {
    minHeight: 72,
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.line,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarBorder: {
    width: 49,
    height: 49,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: COLORS.mint,
    padding: 2,
    backgroundColor: COLORS.paper,
  },

  avatarBorderInactive: {
    width: 49,
    height: 49,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.line,
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
    fontSize: 28,
  },

  friendInfo: {
    flex: 1,
    marginLeft: 11,
  },

  friendName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: COLORS.charcoal,
  },

  friendHandle: {
    marginTop: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 9.5,
    color: COLORS.faint,
  },

  mutualText: {
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
    fontSize: 8,
    color: COLORS.mintStrong,
  },

  addButton: {
    minWidth: 72,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 13,
    backgroundColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  addButtonDone: {
    backgroundColor: COLORS.mintSoft,
  },

  addButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: COLORS.paper,
  },

  addButtonTextDone: {
    color: COLORS.mintStrong,
  },

  inviteButton: {
    minWidth: 76,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  inviteButtonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    color: COLORS.mintStrong,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 61,
    borderTopWidth:
      StyleSheet.hairlineWidth,
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