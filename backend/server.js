import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './db.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB().catch(console.error);

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});