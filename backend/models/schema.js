const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("User", userSchema);


const StoryPromptSchema = new mongoose.Schema({
  title: String,
  content: String,
  genre: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('StoryPrompt', StoryPromptSchema);
