import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.ts";
import { Thing } from "./src/entities/Thing.ts";

dotenv.config();

const app = express();

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
}).catch((error: any) => {
  console.error("Error during Data Source initialization", error);
});

// Enable CORS for all routes
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/error", (req, res) => {
  res.status(500).send("Error");
});

app.get("/secret", (req, res) => {
  res.status(200).send("This is a secret!!!!");
});

app.get("/things", async (req, res) => {
  const things = await AppDataSource.getRepository(Thing).find();
  res.json(things);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
