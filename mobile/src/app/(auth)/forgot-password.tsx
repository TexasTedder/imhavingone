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
  mintSoft: "#D9F0EC",
  paper: "#FFFFFF",
  charcoal: "#23262B",
  darkGrey: "#5B5F63",
  faint: "#8A8E92",
  line: "#E7E5E1",
  sunshine: "#FFC75A",
};

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const emailLooksValid =
    email.trim().length > 5 &&
    email.includes("@") &&
    email.includes(".");

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
              Forgot your{"\n"}
              <Text style={styles.titleMint}>password?</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.subtitle}>
              No problem. Enter your email address and we’ll send you a code to
              reset it.
            </Text>
          </View>

          {/* Email */}
          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>

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

            <Pressable
              disabled={!emailLooksValid}
              style={({ pressed }) => [
                styles.sendButton,
                !emailLooksValid && styles.sendButtonDisabled,
                pressed && emailLooksValid && styles.buttonPressed,
              ]}
              onPress={() => {
                // Real reset OTP request will be connected later.
                router.push("/verify");
              }}
            >
              <Text style={styles.sendButtonText}>Send reset code</Text>
            </Pressable>
          </View>

          {/* Help card */}
          <View style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={28}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.helpCopy}>
              <Text style={styles.helpTitle}>Keep your account secure</Text>

              <Text style={styles.helpText}>
                We’ll only send a reset code to the email linked to your
                ImHavingOne account.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Remembered it?</Text>

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
    maxWidth: 310,
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
  },

  inputIcon: {
    marginLeft: 14,
    marginRight: 11,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    paddingRight: 12,
    fontFamily: "DMSans_400Regular",
    fontSize: 13.5,
    color: COLORS.charcoal,
  },

  sendButton: {
    height: 50,
    marginTop: 16,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonDisabled: {
    opacity: 0.5,
  },

  sendButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14.5,
    color: COLORS.paper,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  /* Help */

  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    borderRadius: 12,
    backgroundColor: "#F1F7F5",
    paddingHorizontal: 17,
    paddingVertical: 15,
  },

  helpIcon: {
    width: 42,
  },

  helpCopy: {
    flex: 1,
  },

  helpTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12.5,
    color: COLORS.charcoal,
  },

  helpText: {
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