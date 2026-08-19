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

export default function ForgotPasswordScreen() {
  const [mobile, setMobile] = useState("");

  const mobileLooksValid =
    mobile.replace(/\D/g, "").length >= 10;

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
              Forgot your{"\n"}
              <Text style={styles.titleMint}>password?</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.subtitle}>
              Enter the mobile number linked to your ImHavingOne account and
              we’ll send you a 6-digit reset code by SMS.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Mobile number</Text>

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
                placeholder="082 123 4567"
                placeholderTextColor={COLORS.faint}
                keyboardType="phone-pad"
                autoCorrect={false}
                textContentType="telephoneNumber"
                style={styles.input}
              />
            </View>

            <Pressable
              disabled={!mobileLooksValid}
              style={({ pressed }) => [
                styles.sendButton,
                !mobileLooksValid && styles.sendButtonDisabled,
                pressed && mobileLooksValid && styles.buttonPressed,
              ]}
              onPress={() => {
                // Later:
                // POST mobile to forgot-password endpoint.
                // On success route to /verify?mode=reset&mobile=...
              }}
            >
              <Text style={styles.sendButtonText}>Send reset code</Text>
            </Pressable>
          </View>

          <View style={styles.helpCard}>
            <View style={styles.helpIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={28}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.helpCopy}>
              <Text style={styles.helpTitle}>Secure account recovery</Text>

              <Text style={styles.helpText}>
                We’ll only send the reset code to the verified mobile number
                linked to your account.
              </Text>
            </View>
          </View>

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
    maxWidth: 315,
    textAlign: "center",
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.darkGrey,
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
    opacity: 0.48,
  },
  sendButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14.5,
    color: COLORS.paper,
  },
  buttonPressed: {
    opacity: 0.82,
  },
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
