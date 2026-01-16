import express from "express";
import axios from "axios";
import Message from "../models/Message.js";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

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

router.post("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.userId,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const userMessage = new Message({
      projectId,
      role: "user",
      content: message,
    });
    await userMessage.save();

    const history = await Message.find({ projectId })
      .sort({ createdAt: 1 })
      .limit(20);

    // Build conversation history
    const conversationHistory = [
      `System: ${project.systemPrompt}`,
      ...history.map(
        (msg) =>
          `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
      ),
    ].join("\n\n");

    // Call Google Gemini API with correct model name
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: conversationHistory,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const aiResponse = response.data.candidates[0].content.parts[0].text;

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

router.delete("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

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

export default router;
