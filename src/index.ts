import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import pagesRoutes from "./routes/pages";
import { pageInit } from "./models/pages";

// Config
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
}));

// Routes
app.use("/pages", pagesRoutes);
app.get("/", (req, res) => res.send("Welcome to Moneyflow Wiki"));

// Connect DB and run
const dbURL = process.env.DATABASE_URL || "";
console.log(`Trying to connect to DB : ${dbURL}`);
const sequelize = new Sequelize(dbURL, {
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    pageInit(sequelize);
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
  })
  .catch(error => console.error('Unable to connect to the database:', error));

export { sequelize }