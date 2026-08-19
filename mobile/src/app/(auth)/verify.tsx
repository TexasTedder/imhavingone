import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
  paper: "#FFFFFF",
  charcoal: "#23262B",
  darkGrey: "#5B5F63",
  faint: "#8A8E92",
  line: "#E7E5E1",
  sunshine: "#FFC75A",
};

const OTP_LENGTH = 6;
const OTP_SECONDS = 5 * 60;

export default function VerifyScreen() {
  const params = useLocalSearchParams<{
    mobile?: string;
    mode?: "register" | "reset";
  }>();

  const mobile =
    typeof params.mobile === "string" && params.mobile.length > 0
      ? params.mobile
      : "your mobile number";

  const mode = params.mode === "reset" ? "reset" : "register";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [secondsRemaining, setSecondsRemaining] = useState(OTP_SECONDS);

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

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setSecondsRemaining(OTP_SECONDS);
    inputs.current[0]?.focus();

    // Later: call resend OTP endpoint.
    // Keep this disabled from real SMS sending until the API flow is wired.
  };

  const isComplete = code.every((digit) => digit.length === 1);

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
          <View style={styles.headingSection}>
            <Text style={styles.heading}>
              Let’s verify{"\n"}
              it’s <Text style={styles.headingMint}>you.</Text>
            </Text>

            <View style={styles.sunshineLine} />

            <Text style={styles.sentText}>
              We sent a 6-digit SMS code to
            </Text>

            <Text style={styles.mobileText}>{mobile}</Text>

            <Text style={styles.instruction}>
              Enter the code below to continue.
            </Text>
          </View>

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
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                style={[
                  styles.otpInput,
                  digit && styles.otpInputActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.timerRow}>
            <Text style={styles.timerLabel}>Code expires in </Text>

            <Text style={styles.timerValue}>
              {formattedTime}
            </Text>
          </View>

          <Pressable
            disabled={!isComplete}
            style={({ pressed }) => [
              styles.verifyButton,
              !isComplete && styles.verifyButtonDisabled,
              pressed && isComplete && styles.buttonPressed,
            ]}
            onPress={() => {
              const otp = code.join("");

              // Next step:
              // POST { mobile, otp } to /api/auth/verify-otp.
              //
              // Register mode success:
              // router.replace("/profile-setup")
              //
              // Reset mode success:
              // router.replace({ pathname: "/reset-password", params: { mobile } })
              console.log("OTP ready to verify:", otp, mode, mobile);
            }}
          >
            <Text style={styles.verifyButtonText}>
              Verify & continue
            </Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              Didn’t receive the code?
            </Text>

            <View style={styles.divider} />
          </View>

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
                name="phone-portrait-outline"
                size={22}
                color={COLORS.mintStrong}
              />

              <Text style={styles.actionText}>
                Change number
              </Text>
            </Pressable>
          </View>

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
                Never share your verification code.{"\n"}
                ImHavingOne will never ask you for it.
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
  mobileText: {
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
