const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all prompts
router.get('/prompts', (req, res) => {
  db.query('SELECT * FROM prompts', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Get prompts by user
router.get('/prompts/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM prompts WHERE created_by = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add a new prompt
router.post('/prompts', (req, res) => {
  const { title, description, created_by } = req.body;
  db.query('INSERT INTO prompts (title, description, created_by) VALUES (?, ?, ?)', 
    [title, description, created_by], 
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Prompt added successfully!', id: result.insertId });
  });
});

module.exports = router;
