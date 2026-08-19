const { parsePhoneNumberFromString } = require("libphonenumber-js");

/**
 * Normalizes a mobile number to E.164 international format.
 *
 * Examples:
 * +27828547929   -> +27828547929
 * 27828547929    -> +27828547929
 * 0027828547929  -> +27828547929
 *
 * For backwards compatibility during South African development:
 * 0828547929     -> +27828547929
 *
 * Returns null when the number cannot be validated.
 */
function normalizeMobileNumber(input) {
  if (!input) {
    return null;
  }

  let mobile = String(input).trim();

  // Remove spaces, brackets, hyphens and other formatting,
  // while preserving a leading + where supplied.
  mobile = mobile.replace(/[^\d+]/g, "");

  if (!mobile) {
    return null;
  }

  // Convert international 00 prefix to +
  // Example: 0027828547929 -> +27828547929
  if (mobile.startsWith("00")) {
    mobile = `+${mobile.substring(2)}`;
  }

  let phoneNumber = null;

  // Standard international E.164-style input
  if (mobile.startsWith("+")) {
    phoneNumber = parsePhoneNumberFromString(mobile);
  }

  // International digits supplied without +
  // Example: 27828547929 -> +27828547929
  else if (/^\d{10,15}$/.test(mobile) && !mobile.startsWith("0")) {
    phoneNumber = parsePhoneNumberFromString(`+${mobile}`);
  }

  // Temporary/default South African local-number support.
  // Example: 0828547929 -> +27828547929
  else if (/^0\d{9}$/.test(mobile)) {
    phoneNumber = parsePhoneNumberFromString(mobile, "ZA");
  }

  if (!phoneNumber || !phoneNumber.isValid()) {
    return null;
  }

  return phoneNumber.number;
}

/*
 * Temporary backwards-compatible alias.
 *
 * authRoutes.js currently imports normalizeSouthAfricanMobile.
 * Keeping this alias means the backend will continue running
 * until we update authRoutes.js in the next step.
 */
const normalizeSouthAfricanMobile = normalizeMobileNumber;

module.exports = {
  normalizeMobileNumber,
  normalizeSouthAfricanMobile,
};