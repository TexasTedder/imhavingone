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
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const canLogin =
    mobile.replace(/\D/g, "").length >= 10 &&
    password.length > 0;

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

          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome back.</Text>

            <Text style={styles.welcomeText}>
              Log in with your mobile number and password.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputShell}>
              <Ionicons
                name="phone-portrait-outline"
                size={18}
                color={COLORS.darkGrey}
                style={styles.inputIcon}
              />

              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="Mobile number"
                placeholderTextColor={COLORS.faint}
                keyboardType="phone-pad"
                autoCorrect={false}
                textContentType="telephoneNumber"
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
              disabled={!canLogin}
              style={({ pressed }) => [
                styles.loginButton,
                !canLogin && styles.loginButtonDisabled,
                pressed && canLogin && styles.buttonPressed,
              ]}
              onPress={() => {
                // Real mobile + password login will be wired later.
              }}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="phone-portrait-outline"
              size={24}
              color={COLORS.mintStrong}
            />
            <Text style={styles.infoText}>
              Your mobile number is your ImHavingOne login.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to ImHavingOne?</Text>

            <Pressable
              onPress={() => router.push("/register")}
              hitSlop={8}
            >
              <Text style={styles.signUpText}>Create account</Text>
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
    paddingTop: 138,
    paddingBottom: 28,
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
  welcomeSection: {
    alignItems: "center",
    marginTop: 25,
  },
  welcomeTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 28,
    lineHeight: 33,
    color: COLORS.charcoal,
  },
  welcomeText: {
    marginTop: 7,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 13.5,
    lineHeight: 20,
    color: COLORS.darkGrey,
  },
  form: {
    marginTop: 28,
    gap: 11,
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
    fontSize: 13.5,
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
    minHeight: 32,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 32,
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
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  loginButtonDisabled: {
    opacity: 0.48,
  },
  loginButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: COLORS.paper,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 26,
    borderRadius: 12,
    backgroundColor: "#F1F7F5",
    paddingHorizontal: 17,
    paddingVertical: 15,
  },
  infoText: {
    flex: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.8,
    lineHeight: 17,
    color: COLORS.charcoal,
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 28,
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
