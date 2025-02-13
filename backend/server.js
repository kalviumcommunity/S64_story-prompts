
<<<<<<< HEAD:backend/server.js
// const express = require("express");
const connectDB = require("./db");
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
>>>>>>> f775b54708e7fae4bef8764b6af71f84ac646130:server.js

const app = express();
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD:backend/server.js
const PORT = process.env.PORT || 3000;
=======
app.use(express.json()); // Middleware to parse JSON requests
>>>>>>> f775b54708e7fae4bef8764b6af71f84ac646130:server.js

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Define Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Item = mongoose.model("Item", itemSchema);

// Home Route with DB Status
app.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the ASAP Project!", databaseStatus: dbStatus });
});

// CRUD Operations

// CREATE - Add a new item
app.post("/items", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Modify an item by ID
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove an item by ID
app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

