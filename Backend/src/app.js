const express = require("express");
const authRoutes = require("./modules/auth/auth.routes");
const agentRoutes = require("./modules/agent/agent.routes");
const chatRoutes = require("./modules/chat/chat.routes");
const auth = require("./middleware/auth");

const app = express();

// Middleware
app.use(express.json());

app.get("/api/test", auth, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
});

app.use("/api/agents", agentRoutes);
app.use("/api/chat", chatRoutes);

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
