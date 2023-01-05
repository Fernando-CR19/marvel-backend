import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import auth from "./auth"
import characters from "./api/character"

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", auth)
app.use("/api/characters", characters)

app.use((err, req, res, next) => {
  console.log("erro", err.message)
  res.status(err?.statusCode || 500).json({ err: err })
})

export default app;