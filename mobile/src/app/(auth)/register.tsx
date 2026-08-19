import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { API_BASE_URL } from "@/constants/api";
import { useMemo, useState } from "react";
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
  sunshine: "#FFC75A",
  red: "#EA1D48",
};

export default function RegisterScreen() {
  const [countryCode, setCountryCode] = useState<CountryCode>("ZA");
  const [callingCode, setCallingCode] = useState("27");
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
    }),
    [password]
  );

  const passwordLooksValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const nationalDigits = mobile.replace(/\D/g, "");

  const normalizedNationalDigits =
    countryCode === "ZA"
      ? nationalDigits.replace(/^0/, "")
      : nationalDigits;

  const mobileLooksValid =
    countryCode === "ZA"
      ? (
          (/^0\d{9}$/.test(nationalDigits)) ||
          (/^\d{9}$/.test(nationalDigits) && !nationalDigits.startsWith("0"))
        )
      : normalizedNationalDigits.length >= 7 &&
        normalizedNationalDigits.length <= 12;

  const fullMobile = `+${callingCode}${normalizedNationalDigits}`;

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode?.[0] || "");
    setCountryPickerVisible(false);
    setMobile("");
    setErrorMessage("");
  };

  const canContinue =
    mobileLooksValid && passwordLooksValid && passwordsMatch;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={COLORS.charcoal}
            />
          </Pressable>

          <View style={styles.brandSection}>
            <View style={styles.wordmarkRow}>
              <Text style={styles.wordmarkLight}>Im Having </Text>
              <Text style={styles.wordmarkBold}>One</Text>
              <Text style={styles.wordmarkDot}>.</Text>
            </View>

            <Text style={styles.tagline}>
              See who’s{" "}
              <Text style={styles.taglineMint}>having one.</Text>
            </Text>
          </View>

          <View style={styles.headingSection}>
            <Text style={styles.heading}>
              Create your{"\n"}
              <Text style={styles.headingMint}>account.</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.subtitle}>
              Use your mobile number so we can send you a secure verification
              code by SMS.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Mobile number</Text>

            <View style={styles.phoneRow}>
              <Pressable
                style={styles.countryPicker}
                onPress={() => setCountryPickerVisible(true)}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withFilter
                  withCallingCode
                  withCountryNameButton={false}
                  visible={countryPickerVisible}
                  onSelect={handleCountrySelect}
                  onClose={() => setCountryPickerVisible(false)}
                  containerButtonStyle={styles.flagButton}
                />

                <Text style={styles.countryCodeText}>+{callingCode}</Text>

                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={COLORS.darkGrey}
                />
              </Pressable>

              <View style={[styles.inputShell, styles.phoneInputShell]}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={18}
                  color={COLORS.darkGrey}
                  style={styles.inputIcon}
                />

                <TextInput
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="82 854 7929"
                  placeholderTextColor={COLORS.faint}
                  keyboardType="phone-pad"
                  autoCorrect={false}
                  textContentType="telephoneNumber"
                  maxLength={16}
                  style={styles.input}
                />
              </View>
            </View>

            <Text style={styles.phoneHint}>
              We’ll send the OTP to {fullMobile || `+${callingCode}`}
            </Text>

            {mobile.length > 0 && !mobileLooksValid && (
              <Text style={styles.errorText}>
                Enter a valid mobile number.
              </Text>
            )}

            <Text style={[styles.label, styles.labelSpaced]}>Password</Text>

            <View style={styles.inputShell}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={COLORS.darkGrey}
                style={styles.inputIcon}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                placeholderTextColor={COLORS.faint}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="newPassword"
                style={styles.input}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword((current) => !current)}
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            <View style={styles.passwordRules}>
              <Rule ok={passwordChecks.length} text="8+ characters" />
              <Rule ok={passwordChecks.upper} text="Uppercase" />
              <Rule ok={passwordChecks.lower} text="Lowercase" />
              <Rule ok={passwordChecks.number} text="Number" />
            </View>

            <Text style={[styles.label, styles.labelSpaced]}>
              Confirm password
            </Text>

            <View
              style={[
                styles.inputShell,
                confirmPassword.length > 0 &&
                  !passwordsMatch &&
                  styles.inputShellError,
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS.darkGrey}
                style={styles.inputIcon}
              />

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                placeholderTextColor={COLORS.faint}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                textContentType="newPassword"
                style={styles.input}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() =>
                  setShowConfirmPassword((current) => !current)
                }
                hitSlop={10}
              >
                <Ionicons
                  name={
                    showConfirmPassword ? "eye-off-outline" : "eye-outline"
                  }
                  size={20}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Passwords do not match.</Text>
            )}

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <Pressable
              disabled={!canContinue || isSubmitting}
              style={({ pressed }) => [
                styles.createButton,
                (!canContinue || isSubmitting) && styles.createButtonDisabled,
                pressed && canContinue && !isSubmitting && styles.buttonPressed,
              ]}
              onPress={async () => {
                if (!canContinue || isSubmitting) return;

                setIsSubmitting(true);
                setErrorMessage("");

                try {
                  const response = await fetch(
                    `${API_BASE_URL}/api/auth/register`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        mobile: fullMobile,
                        password,
                      }),
                    }
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    setErrorMessage(
                      data?.message || "Unable to create account."
                    );
                    return;
                  }

                  router.push({
                    pathname: "/verify",
                    params: {
                      mobile: data.mobile,
                      mode: "register",
                    },
                  });
                } catch (error) {
                  setErrorMessage(
                    "Could not connect to the ImHavingOne server."
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <Text style={styles.createButtonText}>
                {isSubmitting
                  ? "Sending code..."
                  : "Create account & send code"}
              </Text>
            </Pressable>

            <Text style={styles.smsNote}>
              We’ll send one 6-digit verification code by SMS.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>

            <Pressable
              onPress={() => router.replace("/login")}
              hitSlop={8}
            >
              <Text style={styles.loginText}>Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={styles.rule}>
      <Ionicons
        name={ok ? "checkmark-circle" : "ellipse-outline"}
        size={14}
        color={ok ? COLORS.mintStrong : COLORS.faint}
      />
      <Text style={[styles.ruleText, ok && styles.ruleTextOk]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 92,
    paddingBottom: 28,
  },
  backButton: {
    position: "absolute",
    top: 18,
    left: 24,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  brandSection: {
    alignItems: "center",
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  wordmarkLight: {
    fontFamily: "DMSans_400Regular",
    fontSize: 29,
    lineHeight: 34,
    color: COLORS.charcoal,
    letterSpacing: -1.1,
  },
  wordmarkBold: {
    fontFamily: "DMSans_700Bold",
    fontSize: 29,
    lineHeight: 34,
    color: COLORS.mint,
    letterSpacing: -1.1,
  },
  wordmarkDot: {
    fontFamily: "DMSans_700Bold",
    fontSize: 29,
    lineHeight: 34,
    color: COLORS.mint,
  },
  tagline: {
    marginTop: 2,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.charcoal,
  },
  taglineMint: {
    color: COLORS.mintStrong,
  },
  headingSection: {
    alignItems: "center",
    marginTop: 22,
  },
  heading: {
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -1.1,
    color: COLORS.charcoal,
  },
  headingMint: {
    color: COLORS.mint,
  },
  sunshineLine: {
    width: 44,
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.sunshine,
    marginTop: 14,
  },
  subtitle: {
    maxWidth: 310,
    marginTop: 18,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.darkGrey,
  },
  form: {
    marginTop: 26,
  },
  label: {
    marginBottom: 8,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: COLORS.charcoal,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 10,
  },
  countryPicker: {
    height: 50,
    minWidth: 112,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 9,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  flagButton: {
    marginRight: 0,
  },
  countryCodeText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13,
    color: COLORS.charcoal,
  },
  phoneInputShell: {
    flex: 1,
  },
  phoneHint: {
    marginTop: 7,
    fontFamily: "DMSans_400Regular",
    fontSize: 10.8,
    lineHeight: 15,
    color: COLORS.darkGrey,
  },
  labelSpaced: {
    marginTop: 15,
  },
  inputShell: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 9,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
  },
  inputShellError: {
    borderColor: COLORS.red,
  },
  inputIcon: {
    marginLeft: 14,
    marginRight: 11,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    paddingRight: 8,
    fontFamily: "DMSans_400Regular",
    fontSize: 13.5,
    color: COLORS.charcoal,
  },
  eyeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordRules: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    height: 26,
    borderRadius: 999,
    backgroundColor: "#F7F8F7",
  },
  ruleText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10.5,
    color: COLORS.faint,
  },
  ruleTextOk: {
    color: COLORS.mintStrong,
  },
  errorText: {
    marginTop: 6,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.red,
  },
  createButton: {
    height: 52,
    marginTop: 22,
    borderRadius: 10,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonDisabled: {
    opacity: 0.48,
  },
  createButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14.5,
    color: COLORS.paper,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  smsNote: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.darkGrey,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
    paddingTop: 28,
  },
  footerText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.charcoal,
  },
  loginText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 11.5,
    color: COLORS.mintStrong,
  },
});
