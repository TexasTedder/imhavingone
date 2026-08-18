function validatePassword(password) {
  if (!password || typeof password !== "string") {
    return {
      valid: false,
      message: "Password is required.",
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one lowercase letter.",
    };
  }

  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: "Password must include at least one number.",
    };
  }

  return {
    valid: true,
  };
}

module.exports = {
  validatePassword,
};