require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import Routes
const writingChallengeRoutes = require("./routes/itemRoutes");
const promptRoutes = require("./routes/prompts");
const challengesRoutes = require("./routes/challenges");
const usersRoutes = require("./routes/users");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

/* 🔹 1️⃣ Connect to MySQL */
const mysqlDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mysqlDB.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

/* 🔹 2️⃣ Connect to MongoDB */
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

/* 🔹 3️⃣ Routes */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Story Prompts API!" });
});

// MySQL-based Routes
app.use("/api/prompts", writingChallengeRoutes);

// MongoDB-based Routes
app.use("/api/users", promptRoutes);
app.use("/challenges", challengesRoutes);
app.use("/users", usersRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
