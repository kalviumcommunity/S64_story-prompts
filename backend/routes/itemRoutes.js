const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Writing Challenge Schema
const writingChallengeSchema = new mongoose.Schema(
    {
        challenge: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Writing Challenge Model
const WritingChallenge = mongoose.model("WritingChallenge", writingChallengeSchema);

// POST: Store a new writing challenge
router.post("/writing-challenges", async (req, res) => {
    try {
        const { challenge } = req.body;
        if (!challenge) return res.status(400).json({ message: "Challenge text is required" });

        const newChallenge = new WritingChallenge({ challenge });
        await newChallenge.save();
        res.status(201).json(newChallenge);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Fetch all writing challenges
router.get("/writing-challenges", async (req, res) => {
    try {
        const challenges = await WritingChallenge.find().sort({ createdAt: -1 });
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
