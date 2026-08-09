import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
};

type AvatarOption = {
  id: string;
  emoji: string;
  label: string;
};

type DrinkOption = {
  id: string;
  emoji: string;
  label: string;
};

type AccuracyOption = "general" | "balanced" | "accurate";

const AVATARS: AvatarOption[] = [
  { id: "photo", emoji: "📷", label: "Take Photo" },
  { id: "your-photo", emoji: "😎", label: "Your Photo" },
  { id: "avatar-1", emoji: "🧑🏽", label: "" },
  { id: "avatar-2", emoji: "👩🏼", label: "" },
  { id: "avatar-3", emoji: "🧔🏽", label: "" },
];

const DRINKS: DrinkOption[] = [
  { id: "beer", emoji: "🍺", label: "Beer" },
  { id: "lager", emoji: "🍻", label: "Lager" },
  { id: "wine", emoji: "🍷", label: "Wine" },
  { id: "champagne", emoji: "🥂", label: "Champagne" },
  { id: "whiskey", emoji: "🥃", label: "Whiskey" },
];

export default function ProfileSetupScreen() {
  const [mobile, setMobile] = useState("82 123 4567");
  const [nickname, setNickname] = useState("TexasTed");
  const [firstName, setFirstName] = useState("Ted");
  const [lastName, setLastName] = useState("Tredoux");

  const [selectedAvatar, setSelectedAvatar] = useState("your-photo");

  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([
    "beer",
    "lager",
    "wine",
  ]);

  const [accuracy, setAccuracy] =
    useState<AccuracyOption>("general");

  const toggleDrink = (id: string) => {
    setSelectedDrinks((current) => {
      if (current.includes(id)) {
        return current.filter((drinkId) => drinkId !== id);
      }

      return [...current, id];
    });
  };

  const canContinue =
    mobile.trim().length > 0 &&
    nickname.trim().length > 0 &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    selectedDrinks.length >= 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Top navigation */}
        <View style={styles.topBar}>
          <Pressable
            style={styles.topAction}
            onPress={() => router.back()}
            hitSlop={10}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={COLORS.charcoal}
            />
          </Pressable>

          <Pressable
            style={styles.skipButton}
            onPress={() => {
              // Temporary while GeoMap is not built.
            }}
            hitSlop={10}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.miniBrand}>
              <View style={styles.miniCap}>
                <Ionicons
                  name="beer-outline"
                  size={18}
                  color={COLORS.paper}
                />
              </View>
            </View>

            <Text style={styles.title}>
              Let’s set up your profile
            </Text>

            <Text style={styles.subtitle}>
              Help your friends find and recognise you{"\n"}
              on the map.
            </Text>
          </View>

          {/* 1. Mobile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              1. Confirm your mobile number
            </Text>

            <View style={styles.mobileRow}>
              <View style={styles.countryBox}>
                <Text style={styles.flag}>🇿🇦</Text>
                <Text style={styles.countryCode}>+27</Text>

                <Ionicons
                  name="chevron-down"
                  size={13}
                  color={COLORS.darkGrey}
                />
              </View>

              <View style={[styles.inputShell, styles.mobileInputShell]}>
                <TextInput
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                  style={styles.input}
                />

                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.mint}
                />
              </View>
            </View>

            <View style={styles.helperRow}>
              <Ionicons
                name="lock-closed-outline"
                size={12}
                color={COLORS.darkGrey}
              />

              <Text style={styles.helperText}>
                We’ll send important updates to this number.
              </Text>
            </View>
          </View>

          {/* 2. Identity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              2. Who are you?
            </Text>

            <View style={styles.twoColumnRow}>
              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>NickName</Text>

                <View style={styles.inputShell}>
                  <TextInput
                    value={nickname}
                    onChangeText={setNickname}
                    style={styles.input}
                    autoCapitalize="none"
                  />

                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color={COLORS.mint}
                  />
                </View>
              </View>

              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>First Name</Text>

                <View style={styles.inputShell}>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                  />

                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color={COLORS.mint}
                  />
                </View>
              </View>
            </View>

            <Text style={styles.fieldLabel}>Last Name</Text>

            <View style={styles.inputShell}>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />

              <Ionicons
                name="checkmark-circle"
                size={17}
                color={COLORS.mint}
              />
            </View>
          </View>

          {/* 3. Avatar */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              3. Choose your avatar
            </Text>

            <View style={styles.avatarRow}>
              {AVATARS.map((avatar) => {
                const active = selectedAvatar === avatar.id;

                return (
                  <Pressable
                    key={avatar.id}
                    style={styles.avatarOption}
                    onPress={() => setSelectedAvatar(avatar.id)}
                  >
                    <View
                      style={[
                        styles.avatarCircle,
                        active && styles.avatarCircleSelected,
                      ]}
                    >
                      <Text style={styles.avatarEmoji}>
                        {avatar.emoji}
                      </Text>

                      {active && (
                        <View style={styles.avatarCheck}>
                          <Ionicons
                            name="checkmark"
                            size={11}
                            color={COLORS.paper}
                          />
                        </View>
                      )}
                    </View>

                    {!!avatar.label && (
                      <Text style={styles.avatarLabel}>
                        {avatar.label}
                      </Text>
                    )}
                  </Pressable>
                );
              })}

              <Pressable style={styles.moreOption}>
                <View style={styles.moreCircle}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.charcoal}
                  />
                </View>

                <Text style={styles.avatarLabel}>More</Text>
              </Pressable>
            </View>
          </View>

          {/* 4. Drinks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. Your popular drinks (select at least 3)
            </Text>

            <View style={styles.drinksRow}>
              {DRINKS.map((drink) => {
                const active = selectedDrinks.includes(drink.id);

                return (
                  <Pressable
                    key={drink.id}
                    style={styles.drinkOption}
                    onPress={() => toggleDrink(drink.id)}
                  >
                    <View
                      style={[
                        styles.drinkCircle,
                        active && styles.drinkCircleSelected,
                      ]}
                    >
                      <Text style={styles.drinkEmoji}>
                        {drink.emoji}
                      </Text>

                      {active && (
                        <View style={styles.drinkCheck}>
                          <Ionicons
                            name="checkmark"
                            size={10}
                            color={COLORS.paper}
                          />
                        </View>
                      )}
                    </View>

                    <Text style={styles.drinkLabel}>
                      {drink.label}
                    </Text>
                  </Pressable>
                );
              })}

              <Pressable style={styles.drinkOption}>
                <View style={styles.drinkCircle}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color={COLORS.charcoal}
                  />
                </View>

                <Text style={styles.drinkLabel}>More</Text>
              </Pressable>
            </View>

            <Text style={styles.drinksHelper}>
              These help us personalise your experience.
            </Text>
          </View>

          {/* 5. GPS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              5. GPS accuracy setting
            </Text>

            <Text style={styles.gpsIntro}>
              Choose how accurate your location is on the map.
            </Text>

            <View style={styles.gpsSelector}>
              <Pressable
                style={[
                  styles.gpsOption,
                  accuracy === "general" &&
                    styles.gpsOptionSelected,
                ]}
                onPress={() => setAccuracy("general")}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={
                    accuracy === "general"
                      ? COLORS.paper
                      : COLORS.charcoal
                  }
                />

                <View>
                  <Text
                    style={[
                      styles.gpsTitle,
                      accuracy === "general" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    General
                  </Text>

                  <Text
                    style={[
                      styles.gpsSub,
                      accuracy === "general" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    (Approximate)
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[
                  styles.gpsOption,
                  accuracy === "balanced" &&
                    styles.gpsOptionSelected,
                ]}
                onPress={() => setAccuracy("balanced")}
              >
                <Ionicons
                  name="navigate-circle-outline"
                  size={20}
                  color={
                    accuracy === "balanced"
                      ? COLORS.paper
                      : COLORS.charcoal
                  }
                />

                <View>
                  <Text
                    style={[
                      styles.gpsTitle,
                      accuracy === "balanced" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    Balanced
                  </Text>

                  <Text
                    style={[
                      styles.gpsSub,
                      accuracy === "balanced" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    (Pretty close)
                  </Text>
                </View>
              </Pressable>

              <Pressable
                style={[
                  styles.gpsOption,
                  accuracy === "accurate" &&
                    styles.gpsOptionSelected,
                ]}
                onPress={() => setAccuracy("accurate")}
              >
                <Ionicons
                  name="locate-outline"
                  size={20}
                  color={
                    accuracy === "accurate"
                      ? COLORS.paper
                      : COLORS.charcoal
                  }
                />

                <View>
                  <Text
                    style={[
                      styles.gpsTitle,
                      accuracy === "accurate" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    Accurate
                  </Text>

                  <Text
                    style={[
                      styles.gpsSub,
                      accuracy === "accurate" &&
                        styles.gpsTextSelected,
                    ]}
                  >
                    (Exact)
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={styles.changeLaterRow}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color={COLORS.mintStrong}
              />

              <Text style={styles.changeLaterText}>
                You can change this anytime in Settings.
              </Text>
            </View>
          </View>

          {/* Continue */}
          <Pressable
            disabled={!canContinue}
            style={({ pressed }) => [
              styles.continueButton,
              !canContinue && styles.continueButtonDisabled,
              pressed && canContinue && styles.buttonPressed,
            ]}
            onPress={() => router.push("/map")}
            //</ScrollView>onPress={() => {
              // Temporary until GeoMap/main app route exists.
            //}}
          >
            <Text style={styles.continueButtonText}>
              Confirm & continue
            </Text>
          </Pressable>

          <View style={styles.privacyRow}>
            <Ionicons
              name="lock-closed-outline"
              size={13}
              color={COLORS.darkGrey}
            />

            <Text style={styles.privacyText}>
              Your info is private and never shared.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },

  topBar: {
    height: 54,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topAction: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  skipButton: {
    minHeight: 44,
    justifyContent: "center",
  },

  skipText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: COLORS.mintStrong,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 24,
  },

  /* Header */

  header: {
    alignItems: "center",
    marginTop: -4,
    marginBottom: 17,
  },

  miniBrand: {
    alignItems: "center",
    marginBottom: 9,
  },

  miniCap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 21,
    lineHeight: 26,
    color: COLORS.charcoal,
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 3,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.darkGrey,
  },

  /* Shared sections */

  section: {
    marginBottom: 15,
  },

  sectionTitle: {
    marginBottom: 7,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 11.5,
    lineHeight: 15,
    color: COLORS.charcoal,
  },

  fieldLabel: {
    marginBottom: 4,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  inputShell: {
    flex: 1,
    height: 37,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 7,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 0,
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.charcoal,
  },

  /* Mobile */

  mobileRow: {
    flexDirection: "row",
  },

  countryBox: {
    height: 37,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  flag: {
    fontSize: 15,
  },

  countryCode: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10.5,
    color: COLORS.charcoal,
  },

  mobileInputShell: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
    paddingLeft: 3,
  },

  helperText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  /* Name fields */

  twoColumnRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 7,
  },

  halfField: {
    flex: 1,
  },

  /* Avatar */

  avatarRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  avatarOption: {
    width: 48,
    alignItems: "center",
  },

  avatarCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: "#F8F6F0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  avatarCircleSelected: {
    borderWidth: 2,
    borderColor: COLORS.mint,
  },

  avatarEmoji: {
    fontSize: 27,
  },

  avatarCheck: {
    position: "absolute",
    right: -2,
    bottom: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.mint,
    borderWidth: 2,
    borderColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLabel: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    fontSize: 7.5,
    color: COLORS.charcoal,
  },

  moreOption: {
    width: 40,
    alignItems: "center",
  },

  moreCircle: {
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Drinks */

  drinksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  drinkOption: {
    width: 43,
    alignItems: "center",
  },

  drinkCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: "#FAF7EF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  drinkCircleSelected: {
    borderColor: "#C7DDD8",
  },

  drinkEmoji: {
    fontSize: 23,
  },

  drinkCheck: {
    position: "absolute",
    right: -2,
    bottom: -1,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: COLORS.mint,
    borderWidth: 2,
    borderColor: COLORS.paper,
    alignItems: "center",
    justifyContent: "center",
  },

  drinkLabel: {
    marginTop: 4,
    fontFamily: "DMSans_500Medium",
    fontSize: 7.5,
    color: COLORS.charcoal,
  },

  drinksHelper: {
    marginTop: 7,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  /* GPS */

  gpsIntro: {
    marginTop: -3,
    marginBottom: 7,
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },

  gpsSelector: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
  },

  gpsOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: COLORS.line,
  },

  gpsOptionSelected: {
    backgroundColor: COLORS.mint,
  },

  gpsTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 8.5,
    color: COLORS.charcoal,
  },

  gpsSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 6.5,
    color: COLORS.darkGrey,
  },

  gpsTextSelected: {
    color: COLORS.paper,
  },

  changeLaterRow: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  changeLaterText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 8,
    color: COLORS.darkGrey,
  },

  /* CTA */

  continueButton: {
    height: 43,
    borderRadius: 7,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  continueButtonDisabled: {
    opacity: 0.45,
  },

  continueButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13,
    color: COLORS.paper,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  privacyRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },

  privacyText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 8.5,
    color: COLORS.darkGrey,
  },
});