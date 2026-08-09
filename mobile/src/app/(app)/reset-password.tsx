import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
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

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValid = password.length >= 8;
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const canSubmit = passwordValid && passwordsMatch;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Back */}
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

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Create a new{"\n"}
              <Text style={styles.titleMint}>password.</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.subtitle}>
              Choose a new password for your ImHavingOne account.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>New password</Text>

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
                placeholder="Enter new password"
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

            <Text style={styles.label}>Confirm password</Text>

            <View
              style={[
                styles.inputShell,
                confirmPassword.length > 0 &&
                  !passwordsMatch &&
                  styles.inputError,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={COLORS.darkGrey}
                style={styles.inputIcon}
              />

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
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
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            <Text style={styles.passwordHint}>
              Use at least 8 characters.
            </Text>

            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>
                Passwords do not match.
              </Text>
            )}

            <Pressable
              disabled={!canSubmit}
              style={({ pressed }) => [
                styles.resetButton,
                !canSubmit && styles.resetButtonDisabled,
                pressed && canSubmit && styles.buttonPressed,
              ]}
              onPress={() => {
                // Real password reset API call comes later.
                router.replace("/login");
              }}
            >
              <Text style={styles.resetButtonText}>
                Reset password
              </Text>
            </Pressable>
          </View>

          {/* Security note */}
          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={28}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.securityCopy}>
              <Text style={styles.securityTitle}>
                Keep it secure
              </Text>

              <Text style={styles.securityText}>
                Use a password you don’t use anywhere else.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Remembered your password?
            </Text>

            <Pressable
              onPress={() => router.replace("/login")}
              hitSlop={8}
            >
              <Text style={styles.loginText}>Log in</Text>
            </Pressable>
          </View>
        </View>
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

  backButton: {
    position: "absolute",
    top: 18,
    left: 24,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 150,
    paddingBottom: 28,
  },

  /* Header */

  header: {
    alignItems: "center",
  },

  title: {
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.2,
    color: COLORS.charcoal,
  },

  titleMint: {
    color: COLORS.mint,
  },

  sunshineLine: {
    width: 44,
    height: 3,
    borderRadius: 999,
    backgroundColor: COLORS.sunshine,
    marginTop: 16,
  },

  subtitle: {
    marginTop: 23,
    maxWidth: 300,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.darkGrey,
  },

  /* Form */

  form: {
    marginTop: 34,
  },

  label: {
    marginBottom: 8,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  inputShell: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 9,
    backgroundColor: COLORS.paper,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  inputError: {
    borderColor: "#EA1D48",
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

  passwordHint: {
    marginTop: -6,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: COLORS.darkGrey,
  },

  errorText: {
    marginTop: 5,
    fontFamily: "DMSans_500Medium",
    fontSize: 11.5,
    color: "#EA1D48",
  },

  resetButton: {
    height: 50,
    marginTop: 22,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    justifyContent: "center",
    alignItems: "center",
  },

  resetButtonDisabled: {
    opacity: 0.5,
  },

  resetButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14.5,
    color: COLORS.paper,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  /* Security */

  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    borderRadius: 12,
    backgroundColor: "#F1F7F5",
    paddingHorizontal: 17,
    paddingVertical: 15,
  },

  securityIcon: {
    width: 42,
  },

  securityCopy: {
    flex: 1,
  },

  securityTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12.5,
    color: COLORS.charcoal,
  },

  securityText: {
    marginTop: 3,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: COLORS.charcoal,
  },

  /* Footer */

  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingTop: 24,
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