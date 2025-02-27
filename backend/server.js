require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

// Schema for Writing Challenges
const challengeSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  contributor: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Writing Challenges API!" });
});

// Get all writing challenges
app.get("/challenges", async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ date: -1 });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new writing challenge
app.post("/challenges", async (req, res) => {
  try {
    const newChallenge = await Challenge.create(req.body);
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
