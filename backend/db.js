import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const DB_NAME = process.env.DB_NAME;

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function getDB() {
  if (!db) throw new Error("Database not initialized");
  return db;
}

export { connectDB, getDB };
