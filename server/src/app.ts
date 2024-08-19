import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import sleepRoutes from "./routes/sleepRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";

export const app: Application = express();
async function createServer() {
  app.use(cors());
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api/sleep-records', sleepRoutes);
  app.use('/api/users', userRoutes);

  app.use(errorHandler);
}
createServer();
