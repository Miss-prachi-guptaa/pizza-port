import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import sequelize from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`Server chal raha hai port ${PORT} par`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));