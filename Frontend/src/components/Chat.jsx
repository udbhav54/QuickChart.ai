import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = ({ project }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (project) {
      loadMessages();
    }
  }, [project]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = async () => {
    try {
      const response = await axios.get(`/api/chat/${project._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`/api/chat/${project._id}`, {
        message: userMessage,
      });

      setMessages([
        ...messages,
        response.data.userMessage,
        response.data.assistantMessage,
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="empty-state">
        <h3>No Project Selected</h3>
        <p>Select a project from the sidebar or create a new one</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{project.name}</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>
          System: {project.systemPrompt}
        </p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={msg._id || index} className={`message ${msg.role}`}>
              <div className="message-role">{msg.role.toUpperCase()}</div>
              <div>{msg.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" className="btn send-btn" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
