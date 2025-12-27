import { Request } from "express";

export type CreateUserBody = {
  name: string;
  email: string;
  password_hash: string;
};

export interface JWTPayload {
  sub: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}
