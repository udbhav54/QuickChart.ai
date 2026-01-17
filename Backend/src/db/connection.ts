import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  try {
    await connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
    throw new Error("Could not disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
