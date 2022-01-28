import express from "express";
import cors from "cors";

// Config
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());