import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../users/users.service";
import { CreateUserBody } from "../../types/global";

const JWT_SECRET: string = process.env.JWT_SECRET!;

export const register = async (data: CreateUserBody) => {
  const userExist = await findUserByEmail(data.email);

  if (userExist) throw new Error("Email already in use");

  const hashPassword = await bcrypt.hash(data.password_hash, 10);

  const newUser = await createUser({
    name: data.name,
    email: data.email,
    password_hash: hashPassword,
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("Invalid Credentials");

  const isValid: boolean = await bcrypt.compare(password, user.password_hash);

  if (!isValid) throw new Error("Invalid Credentials");

  return jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
    subject: user.id,
  });
};
