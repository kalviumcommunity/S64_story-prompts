const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Dummy user data
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded; // Attach decoded user info to request
        next();
    });
};

// Get all users (Protected Route)
router.get("/", verifyToken, (req, res) => {
    res.json(users);
});

module.exports = router;
