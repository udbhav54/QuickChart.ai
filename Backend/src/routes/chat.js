const express = require("express");
const router = express.Router();
const axios = require("axios");
const Message = require("../models/Message");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

// Get chat history for a project
router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const messages = await Message.find({ projectId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Send message and get AI response
router.post("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;

    // Verify project belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Save user message
    const userMessage = new Message({
      projectId,
      role: "user",
      content: message,
    });
    await userMessage.save();

    // Get chat history
    const history = await Message.find({ projectId })
      .sort({ createdAt: 1 })
      .limit(20);

    // Prepare messages for OpenAI
    const messages = [
      { role: "system", content: project.systemPrompt },
      ...history.map((msg) => ({ role: msg.role, content: msg.content })),
    ];

    // Call OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    // Save AI response
    const assistantMessage = new Message({
      projectId,
      role: "assistant",
      content: aiResponse,
    });
    await assistantMessage.save();

    res.json({
      userMessage,
      assistantMessage,
    });
  } catch (error) {
    console.error("Chat error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error processing chat",
      error: error.response?.data?.error?.message || error.message,
    });
  }
});

// Clear chat history
router.delete("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Message.deleteMany({ projectId });
    res.json({ message: "Chat history cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
