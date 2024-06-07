import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.url}\n
    Request Method: ${req.method}\n
    Request Path: ${req.path}\n
    Request Time: ${new Date()}`);
  next();
};
