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
  paper: "#FFFFFF",
  charcoal: "#23262B",
  darkGrey: "#5B5F63",
  faint: "#8A8E92",
  line: "#E7E5E1",
  red: "#EA1D48",
};

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
          {/* Brand */}
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

          {/* Divider title */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerLabel}>Create account or log in</Text>
            <View style={styles.divider} />
          </View>

          {/* Social / account options */}
          <View style={styles.authButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryAuthButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => {
                // Email registration flow will be wired next.
              }}
            >
              <Ionicons
                name="mail-outline"
                size={19}
                color={COLORS.paper}
              />
              <Text style={styles.primaryAuthButtonText}>
                Continue with Email
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.socialPressed,
              ]}
              onPress={() => {
                // Apple authentication will be wired later.
              }}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color={COLORS.charcoal}
              />
              <Text style={styles.socialButtonText}>
                Continue with Apple
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.socialPressed,
              ]}
              onPress={() => {
                // Google authentication will be wired later.
              }}
            >
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.socialButtonText}>
                Continue with Google
              </Text>
            </Pressable>
          </View>

          {/* OR divider */}
          <View style={styles.orRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Login form */}
          <View style={styles.form}>
            <View style={styles.inputShell}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={COLORS.faint}
                style={styles.inputIcon}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor={COLORS.faint}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                style={styles.input}
              />
            </View>

            <View style={styles.inputShell}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={COLORS.faint}
                style={styles.inputIcon}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={COLORS.faint}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="password"
                style={styles.input}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword((current) => !current)}
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={19}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            <View style={styles.formOptions}>
              <Pressable
                style={styles.rememberRow}
                onPress={() => setRememberMe((current) => !current)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <Ionicons
                      name="checkmark"
                      size={13}
                      color={COLORS.paper}
                    />
                  )}
                </View>

                <Text style={styles.rememberText}>Remember me</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/forgot-password")}
                hitSlop={8}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>

            <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>

            <Pressable
              onPress={() => {
                // Sign-up form comes next.
              }}
              hitSlop={8}
            >
              <Text style={styles.signUpText}>Sign up</Text>
            </Pressable>
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

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 24,
  },

  /* ---------- Brand ---------- */

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
    color: COLORS.charcoal,
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
    color: COLORS.mint,
  },

  /* ---------- Dividers ---------- */

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 19,
    marginBottom: 14,
  },

  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.line,
  },

  dividerLabel: {
    marginHorizontal: 12,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.darkGrey,
  },

  /* ---------- Auth buttons ---------- */

  authButtons: {
    gap: 8,
  },

  primaryAuthButton: {
    height: 48,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  primaryAuthButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: COLORS.paper,
  },

  socialButton: {
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 9,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  socialButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13.5,
    color: COLORS.charcoal,
  },

  googleG: {
    width: 20,
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#4285F4",
  },

  buttonPressed: {
    opacity: 0.82,
  },

  socialPressed: {
    backgroundColor: "#F8F8F6",
  },

  /* ---------- OR ---------- */

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  orText: {
    marginHorizontal: 15,
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: COLORS.darkGrey,
  },

  /* ---------- Form ---------- */

  form: {
    gap: 9,
  },

  inputShell: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.paper,
  },

  inputIcon: {
    marginLeft: 14,
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    paddingRight: 12,
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: COLORS.charcoal,
  },

  eyeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  formOptions: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  rememberRow: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#BEC3C1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  checkboxChecked: {
    borderColor: COLORS.mint,
    backgroundColor: COLORS.mint,
  },

  rememberText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.charcoal,
  },

  forgotText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11.5,
    color: COLORS.mintStrong,
  },

  loginButton: {
    height: 46,
    marginTop: 2,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: COLORS.paper,
  },

  /* ---------- Footer ---------- */

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 17,
  },

  footerText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.charcoal,
  },

  signUpText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 11.5,
    color: COLORS.mintStrong,
  },
});