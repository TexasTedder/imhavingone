import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

const OTP_LENGTH = 6;

export default function VerifyScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [secondsRemaining, setSecondsRemaining] = useState(165);

  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updated = [...code];
    updated[index] = digit;
    setCode(updated);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    key: string,
    index: number
  ) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setSecondsRemaining(165);
    inputs.current[0]?.focus();

    // Real resend OTP API call comes later.
  };

  const isComplete = code.every((digit) => digit.length === 1);

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
          {/* Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.heading}>
              Let’s verify{"\n"}
              it’s <Text style={styles.headingMint}>you.</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.sentText}>
              We’ve sent a 6-digit code to
            </Text>

            <Text style={styles.emailText}>
              texas@imhavingone.com
            </Text>

            <Text style={styles.instruction}>
              Enter the code below to continue.
            </Text>
          </View>

          {/* OTP */}
          <View style={styles.otpRow}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                style={[
                  styles.otpInput,
                  digit && styles.otpInputActive,
                ]}
              />
            ))}
          </View>

          {/* Timer */}
          <View style={styles.timerRow}>
            <Text style={styles.timerLabel}>Code expires in </Text>

            <Text style={styles.timerValue}>
              {formattedTime}
            </Text>
          </View>

          {/* Verify */}
          <Pressable
            disabled={!isComplete}
            style={({ pressed }) => [
              styles.verifyButton,
              !isComplete && styles.verifyButtonDisabled,
              pressed && isComplete && styles.buttonPressed,
            ]}
            onPress={() => {
              // Real OTP verification comes later.
              // Successful verification will route to profile setup.
            }}
          >
            <Text style={styles.verifyButtonText}>
              Verify & continue
            </Text>
          </Pressable>

          {/* Didn't receive */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              Didn’t receive the code?
            </Text>

            <View style={styles.divider} />
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <Pressable
              style={styles.action}
              onPress={handleResend}
            >
              <Ionicons
                name="refresh-outline"
                size={22}
                color={COLORS.mintStrong}
              />

              <Text style={styles.actionText}>
                Resend code
              </Text>
            </Pressable>

            <View style={styles.verticalDivider} />

            <Pressable
              style={styles.action}
              onPress={() => router.back()}
            >
              <Ionicons
                name="mail-outline"
                size={22}
                color={COLORS.mintStrong}
              />

              <Text style={styles.actionText}>
                Change email
              </Text>
            </Pressable>
          </View>

          {/* Security */}
          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={29}
                color={COLORS.mintStrong}
              />
            </View>

            <View style={styles.securityCopy}>
              <Text style={styles.securityTitle}>
                Your security matters
              </Text>

              <Text style={styles.securityText}>
                We’ll never share your code.{"\n"}
                ImHavingOne is safe and private.
              </Text>
            </View>
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
    paddingTop: 125,
    paddingBottom: 28,
  },

  /* Heading */

  headingSection: {
    alignItems: "center",
  },

  heading: {
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.2,
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
    marginTop: 16,
    marginBottom: 24,
  },

  sentText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.charcoal,
  },

  emailText: {
    marginTop: 1,
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.charcoal,
  },

  instruction: {
    marginTop: 4,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.charcoal,
  },

  /* OTP */

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 26,
  },

  otpInput: {
    flex: 1,
    maxWidth: 48,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 9,
    backgroundColor: COLORS.paper,
    textAlign: "center",
    fontFamily: "DMSans_600SemiBold",
    fontSize: 20,
    color: COLORS.charcoal,
  },

  otpInputActive: {
    borderColor: COLORS.mint,
  },

  /* Timer */

  timerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  timerLabel: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: COLORS.darkGrey,
  },

  timerValue: {
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    color: COLORS.mintStrong,
  },

  /* Verify button */

  verifyButton: {
    height: 50,
    borderRadius: 9,
    backgroundColor: COLORS.mint,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  verifyButtonDisabled: {
    opacity: 0.55,
  },

  verifyButtonText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: COLORS.paper,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  /* Divider */

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 27,
  },

  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.line,
  },

  dividerText: {
    marginHorizontal: 13,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    color: COLORS.darkGrey,
  },

  /* Secondary actions */

  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 21,
  },

  action: {
    flex: 1,
    minHeight: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  actionText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: COLORS.charcoal,
  },

  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    height: 34,
    backgroundColor: COLORS.line,
  },

  /* Security card */

  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    minHeight: 82,
    borderRadius: 12,
    backgroundColor: "#F1F7F5",
    paddingHorizontal: 17,
    paddingVertical: 14,
  },

  securityIcon: {
    width: 40,
    alignItems: "flex-start",
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
    marginTop: 2,
    fontFamily: "DMSans_400Regular",
    fontSize: 11.5,
    lineHeight: 16,
    color: COLORS.charcoal,
  },
});