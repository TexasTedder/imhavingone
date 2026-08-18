const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "imhavingone-backend",
  });
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ImHavingOne backend running on port ${PORT}`);
});