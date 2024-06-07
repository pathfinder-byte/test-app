import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import routes from "./routes";
import { logger } from "./middlewares/logger";
import cookieParser from "cookie-parser";
import "./seed";

const config = (app: Application): void => {
  const corsOptions: CorsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  };
  app.use(logger);
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
};

export default function Server(): Application {
  const app = express();
  config(app);
  routes(app);
  return app;
}
