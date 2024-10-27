import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";
import taskRoutes from "./routes/tasks.js";
import cors from 'cors';



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().catch(console.error);

app.use("/api/tasks", taskRoutes);

export default app;
