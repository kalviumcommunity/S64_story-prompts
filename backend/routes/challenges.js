const express = require("express"); 
const router = express.Router();

// Temporary in-memory storage (replace with a database)
let challenges = [];

// POST route to add a new challenge (explicit endpoint)
router.post("/add", (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    const newChallenge = {
        id: challenges.length + 1,
        prompt,
    };

    challenges.push(newChallenge);
    res.status(201).json(newChallenge);
});

// GET route to retrieve all challenges
router.get("/all", (req, res) => {
    res.json(challenges);
});

module.exports = router;
