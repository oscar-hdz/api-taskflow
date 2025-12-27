import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthRequest, JWTPayload } from "../types/global";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader: string = req.headers.authorization!;
  if (!authHeader) return res.status(401).json({ message: "Token is missing" });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
