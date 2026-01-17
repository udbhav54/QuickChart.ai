import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
const chatSchema = new mongoose.Schema({
  id:{
    type:String,
    default:randomUUID()
  },
  role: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    chats: [chatSchema]
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
