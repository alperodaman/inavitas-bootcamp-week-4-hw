import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => console.log(`PockerLibrary is running now at port ${PORT}!`));
