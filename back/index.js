import Dotenv from "dotenv";
Dotenv.config(); // 표현식이기 때문에 import보다 늦게 실행됨
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import express, { json, urlencoded } from "express";
import questionRouter from "./routers/v1/questionRouter/index.js";
import reportRouter from "./routers/v1/reportRouter/index.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://ec2-54-180-11-0.ap-northeast-2.compute.amazonaws.com:3000",
      "http://valuefarm.pacer.co.kr",
    ],
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(helmet());

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1", questionRouter);
app.use("/api/v1", reportRouter);

if (process.env.NODE_ENV == "production") {
  console.log("Production Mode");
} else if (process.env.NODE_ENV == "development") {
  console.log("Development Mode");
}

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
