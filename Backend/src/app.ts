import express from "express";
import { config } from "dotenv";
import morgan from "morgan"

config()

const app = express();

// middelwares 
app.use(express.json())

// remove it in production 
app.use(morgan("dev"))


export default app;