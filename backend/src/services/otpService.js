const crypto = require("crypto");

const OTP_EXPIRY_MS = 5 * 60 * 1000;

const otpStore = new Map();

function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

function saveOtp(mobile, otp) {
  otpStore.set(mobile, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
  });
}

function verifyOtp(mobile, otp) {
  const record = otpStore.get(mobile);

  if (!record) {
    return {
      valid: false,
      message: "No OTP found for this mobile number.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobile);

    return {
      valid: false,
      message: "OTP has expired.",
    };
  }

  if (record.otp !== otp) {
    return {
      valid: false,
      message: "Invalid OTP.",
    };
  }

  otpStore.delete(mobile);

  return {
    valid: true,
  };
}

function deleteOtp(mobile) {
  otpStore.delete(mobile);
}

module.exports = {
  generateOtp,
  saveOtp,
  verifyOtp,
  deleteOtp,
};