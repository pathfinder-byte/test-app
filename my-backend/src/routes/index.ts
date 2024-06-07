import { Application, Request, Response } from "express";
import userRoutes from "./user.routes";
import homeRoutes from "./home.routes";
export default function routes(app: Application) {
  app.use("/api", homeRoutes);
  app.use("/api/users", userRoutes);
}
