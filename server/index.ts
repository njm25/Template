import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.ts";
import { registerServices } from "./src/core/serviceLoader.ts";
dotenv.config();

const app = express();

// Parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

AppDataSource.initialize().then(async () => {
  await registerServices(app);
}).catch((error: any) => {
  console.error("Error during Data Source initialization", error);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});