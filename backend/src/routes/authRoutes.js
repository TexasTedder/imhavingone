const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      ok: false,
      message: "Mobile number and password are required.",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Registration request received.",
    mobile,
  });
});

module.exports = router;