import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import passport from "passport";
import cookieSession from "cookie-session";
import passportSetup from "./config/passport.js";
import session from "express-session";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://taskmanagervoosh.netlify.app"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
