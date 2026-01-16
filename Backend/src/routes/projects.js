const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

// Get all projects for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single project
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, systemPrompt } = req.body;

    const project = new Project({
      name,
      systemPrompt: systemPrompt || "You are a helpful assistant.",
      userId: req.userId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, systemPrompt } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, systemPrompt, updatedAt: Date.now() },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
