require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const Schema = require("./models/schema");

// Import Routes
const writingChallengeRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Writing Challenges API!" });
});
// router.get('/users', async (req, res) => {
//   try {
//       const users = await User.find(); // Fetch users from MongoDB
//       res.status(200).json(users);
//   } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ message: "Error fetching users", error });
//   }
// });

// Writing Challenges Routes
app.use("/challenges", writingChallengeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
