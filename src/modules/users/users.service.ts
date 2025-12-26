import { prisma } from "../../lib/prisma";
import type { CreateUserBody } from "../../types/global";

export const findUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } });
};

export const createUser = async (data: CreateUserBody) => {
  return prisma.users.create({ data });
};
