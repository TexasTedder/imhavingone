function normalizeSouthAfricanMobile(input) {
  if (!input) {
    return null;
  }

  let mobile = String(input).trim();

  // Remove spaces, hyphens, brackets, etc.
  mobile = mobile.replace(/[^\d+]/g, "");

  // 0821234567 -> +27821234567
  if (/^0\d{9}$/.test(mobile)) {
    return `+27${mobile.substring(1)}`;
  }

  // 27821234567 -> +27821234567
  if (/^27\d{9}$/.test(mobile)) {
    return `+${mobile}`;
  }

  // Already in E.164-style ZA format
  if (/^\+27\d{9}$/.test(mobile)) {
    return mobile;
  }

  return null;
}

module.exports = {
  normalizeSouthAfricanMobile,
};