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
  sunshine: "#FFC75A",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

            <View style={styles.sunshineLine} />
          </View>

          {/* Welcome */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              Log in to see who’s{" "}
              <Text style={styles.welcomeMint}>having one.</Text>
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputShell}>
              <Ionicons
                name="mail-outline"
                size={18}
                color={COLORS.darkGrey}
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
                color={COLORS.darkGrey}
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
                  size={20}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            <View style={styles.optionsRow}>
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
              onPress={() => router.push("/profile-setup")}
              //</View>onPress={() => {
                // Real login will be connected later.
              //}}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </Pressable>
          </View>

          {/* OR */}
          <View style={styles.orRow}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Social login */}
          <View style={styles.socialSection}>
            <Pressable
              style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.socialPressed,
              ]}
              onPress={() => {
                // Apple auth later.
              }}
            >
              <Ionicons
                name="logo-apple"
                size={21}
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
                // Google auth later.
              }}
            >
              <Text style={styles.googleG}>G</Text>

              <Text style={styles.socialButtonText}>
                Continue with Google
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>

            <Pressable
              onPress={() => router.push("/register")}
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
    paddingHorizontal: 28,
    paddingTop: 150,
    paddingBottom: 24,
  },

  /* Brand */

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
    fontSize: 30,
    lineHeight: 35,
    color: COLORS.charcoal,
    letterSpacing: -1.2,
  },

  wordmarkBold: {
    fontFamily: "DMSans_700Bold",
    fontSize: 30,
    lineHeight: 35,
    color: COLORS.mint,
    letterSpacing: -1.2,
  },

  wordmarkDot: {
    fontFamily: "DMSans_700Bold",
    fontSize: 30,
    lineHeight: 35,
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

  sunshineLine: {
    width: 42,
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.sunshine,
    marginTop: 18,
  },

  /* Welcome */

  welcomeSection: {
    alignItems: "center",
    marginTop: 19,
  },

  welcomeTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.charcoal,
  },

  welcomeText: {
    marginTop: 5,
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.charcoal,
  },

  welcomeMint: {
    color: COLORS.mintStrong,
  },

  /* Form */

  form: {
    marginTop: 17,
    gap: 10,
  },

  inputShell: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
  },

  inputIcon: {
    marginLeft: 14,
    marginRight: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    paddingRight: 10,
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

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 30,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 30,
  },

  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#BCC2BF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  checkboxChecked: {
    backgroundColor: COLORS.mint,
    borderColor: COLORS.mint,
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
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  loginButtonText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 15,
    color: COLORS.paper,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  /* OR */

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 21,
  },

  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.line,
  },

  orText: {
    marginHorizontal: 15,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.charcoal,
  },

  /* Social */

  socialSection: {
    gap: 10,
  },

  socialButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 8,
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
    width: 21,
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 20,
    color: "#4285F4",
  },

  socialPressed: {
    backgroundColor: "#F8F8F6",
  },

  /* Footer */

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
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