import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source.ts";
import { registerServices } from "./src/core/serviceLoader.ts";
import session from "express-session";
import MySQLSession from "express-mysql-session";
import passport from "passport";

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

// Session store (MariaDB)
const MySQLStore = MySQLSession(session);
const sessionStore = new MySQLStore({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT ?? 3306),
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

const sessionSecret =
	process.env.SESSION_SECRET ??
	(() => {
		if (process.env.NODE_ENV === "production") {
			throw new Error("SESSION_SECRET is not set");
		}
		console.warn("Using insecure dev session secret");
		return "dev_only_secret_change_me";
})();

app.use(session({
	name: process.env.SESSION_COOKIE_NAME ?? "sid",
	secret: sessionSecret,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: Number(7 * 24 * 60 * 60 * 1000),
	}
}));

app.use(passport.initialize());
app.use(passport.session());

AppDataSource.initialize().then(async () => {
  await registerServices(app);
}).catch((error: any) => {
  console.error("Error during Data Source initialization", error);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});