import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./source/router/index.js";
import "./source/adapters/database/postgresql.js";

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use("/", router);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => console.log(`PockerLibrary is running now at port ${PORT}!`));
