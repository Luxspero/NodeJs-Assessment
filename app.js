import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
