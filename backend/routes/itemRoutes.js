const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Writing Challenge Schema
const writingChallengeSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        genre: { type: String, required: true },
        story: { type: String, required: true },
    },
    { timestamps: true }
);

// Writing Challenge Model
const WritingChallenge = mongoose.model("WritingChallenge", writingChallengeSchema);

// GET: Fetch all writing challenges
router.get("/", async (req, res) => {
    try {
        const challenges = await WritingChallenge.find().sort({ createdAt: -1 });
        res.json(challenges);
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST: Submit a new writing challenge
router.post("/", async (req, res) => {
    try {
        const { userName, genre, story } = req.body;
        if (!userName || !genre || !story) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newChallenge = new WritingChallenge({ userName, genre, story });
        await newChallenge.save();

        res.status(201).json({ message: "Story submitted successfully", challenge: newChallenge });
    } catch (error) {
        console.error("Error submitting story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
