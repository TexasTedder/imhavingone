import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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
  red: "#EA1D48",
};

export default function ResetPasswordScreen() {
  const { mobile } = useLocalSearchParams<{ mobile?: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordLooksValid = useMemo(
    () =>
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password),
    [password]
  );

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const canSave = passwordLooksValid && passwordsMatch;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Create a new{"\n"}
              <Text style={styles.titleMint}>password.</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.subtitle}>
              Choose a new password for{" "}
              <Text style={styles.mobileText}>
                {typeof mobile === "string" ? mobile : "your account"}
              </Text>
              .
            </Text>
          </View>

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
                placeholder="New password"
                placeholderTextColor={COLORS.faint}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                textContentType="newPassword"
                style={styles.input}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword((current) => !current)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={COLORS.darkGrey}
                />
              </Pressable>
            </View>

            <Text style={[styles.label, styles.labelSpaced]}>
              Confirm new password
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

            <Pressable
              disabled={!canSave}
              style={({ pressed }) => [
                styles.saveButton,
                !canSave && styles.saveButtonDisabled,
                pressed && canSave && styles.buttonPressed,
              ]}
              onPress={() => {
                // Later: POST verified reset token/mobile + new password.
                // On success route back to /login.
              }}
            >
              <Text style={styles.saveButtonText}>Save new password</Text>
            </Pressable>
          </View>

          <View style={styles.securityCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color={COLORS.mintStrong}
            />

            <Text style={styles.securityText}>
              Your new password must be at least 8 characters and include an
              uppercase letter, lowercase letter and number.
            </Text>
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
    paddingTop: 145,
    paddingBottom: 28,
  },
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
    maxWidth: 310,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.darkGrey,
  },
  mobileText: {
    fontFamily: "DMSans_600SemiBold",
    color: COLORS.charcoal,
  },
  form: {
    marginTop: 34,
  },
  label: {
    marginBottom: 8,
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: COLORS.charcoal,
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
  errorText: {
    marginTop: 6,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.red,
  },
  saveButton: {
    height: 50,
    marginTop: 22,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    opacity: 0.48,
  },
  saveButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14.5,
    color: COLORS.paper,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 26,
    borderRadius: 12,
    backgroundColor: "#F1F7F5",
    paddingHorizontal: 17,
    paddingVertical: 15,
  },
  securityText: {
    flex: 1,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: COLORS.charcoal,
  },
});
