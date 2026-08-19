const express = require("express");

const {
  normalizeMobileNumber,
} = require("../services/mobileService");

const {
  validatePassword,
} = require("../services/passwordService");

const {
  generateOtp,
  saveOtp,
  verifyOtp,
  deleteOtp,
} = require("../services/otpService");

const {
  sendSms,
} = require("../services/smsService");

const router = express.Router();


// ============================================
// REGISTER
// ============================================

router.post("/register", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      ok: false,
      message: "Mobile number and password are required.",
    });
  }

  const normalizedMobile = normalizeMobileNumber(mobile);

  if (!normalizedMobile) {
    return res.status(400).json({
      ok: false,
      message: "Please enter a valid mobile number.",
    });
  }

  const passwordValidation = validatePassword(password);

  if (!passwordValidation.valid) {
    return res.status(400).json({
      ok: false,
      message: passwordValidation.message,
    });
  }

  const otp = generateOtp();

  saveOtp(normalizedMobile, otp);

  const smsMessage =
    `Your ImHavingOne verification code is ${otp}`;

  try {
    await sendSms(
      normalizedMobile.replace("+", ""),
      smsMessage,
      false
    );
  } catch (error) {
    console.error("SMS send failed:", error.message);

    deleteOtp(normalizedMobile);

    return res.status(502).json({
      ok: false,
      message: "We could not send your verification code. Please try again.",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Registration request received.",
    mobile: normalizedMobile,
  });
});


// ============================================
// VERIFY OTP
// ============================================

router.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      ok: false,
      message: "Mobile number and OTP are required.",
    });
  }

  const normalizedMobile = normalizeMobileNumber(mobile);

  if (!normalizedMobile) {
    return res.status(400).json({
      ok: false,
      message: "Please enter a valid mobile number.",
    });
  }

  const result = verifyOtp(
    normalizedMobile,
    String(otp)
  );

  if (!result.valid) {
    return res.status(400).json({
      ok: false,
      message: result.message,
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Mobile number verified successfully.",
    mobile: normalizedMobile,
  });
});


module.exports = router;