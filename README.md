# Chatbot Platform - MERN Stack

A full-stack chatbot platform built with MongoDB, Express, React, and Node.js.

## Features

- ✅ User Authentication (JWT)
- ✅ Project/Agent Creation
- ✅ Custom System Prompts
- ✅ Real-time Chat with OpenAI
- ✅ Chat History Storage
- ✅ Responsive UI

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- OpenAI API

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API Key

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
OPENAI_API_KEY=your_openai_api_key
```

4. Start server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Usage

1. Register a new account
2. Login with your credentials
3. Create a new project/agent with a custom system prompt
4. Start chatting with your AI agent
5. View chat history in real-time

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Chat
- `GET /api/chat/:projectId` - Get chat history
- `POST /api/chat/:projectId` - Send message
- `DELETE /api/chat/:projectId` - Clear chat history

## Architecture
````
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────▶│   Express   │─────▶│   MongoDB   │
│   Frontend  │◀─────│   Backend   │◀─────│   Database  │
└─────────────┘      └─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  OpenAI API │
                     └─────────────┘
