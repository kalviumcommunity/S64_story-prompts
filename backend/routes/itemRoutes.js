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

// Validation function
const validateWritingChallenge = (userName, genre, story) => {
    if (!userName || typeof userName !== "string" || userName.trim().length < 3) {
        return "Invalid userName. It must be at least 3 characters long.";
    }
    if (!genre || typeof genre !== "string" || genre.trim().length < 3) {
        return "Invalid genre. It must be at least 3 characters long.";
    }
    if (!story || typeof story !== "string" || story.trim().length < 50) {
        return "Story must be at least 50 characters long.";
    }
    return null; // No errors
};

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

// POST: Submit a new writing challenge with validation
router.post("/", async (req, res) => {
    const { userName, genre, story } = req.body;

    const validationError = validateWritingChallenge(userName, genre, story);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const newChallenge = new WritingChallenge({ userName, genre, story });
        await newChallenge.save();
        res.status(201).json({ message: "Story submitted successfully", challenge: newChallenge });
    } catch (error) {
        console.error("Error submitting story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT: Update a writing challenge with validation
router.put("/:id", async (req, res) => {
    const { userName, genre, story } = req.body;

    const validationError = validateWritingChallenge(userName, genre, story);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        const updatedChallenge = await WritingChallenge.findByIdAndUpdate(
            req.params.id,
            { userName, genre, story },
            { new: true }
        );

        if (!updatedChallenge) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.status(200).json({ message: "Story updated successfully", challenge: updatedChallenge });
    } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE: Delete a writing challenge by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedChallenge = await WritingChallenge.findByIdAndDelete(req.params.id);

        if (!deletedChallenge) {
            return res.status(404).json({ error: "Story not found" });
        }

        res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
        console.error("Error deleting story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/users', async (req, res) => {
    try {
      const users = await User.find({}, 'name _id');
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Fetch story prompts by selected user
  router.get('/prompts/:userId', async (req, res) => {
    try {
      const prompts = await StoryPrompt.find({ created_by: req.params.userId });
      res.json(prompts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;

