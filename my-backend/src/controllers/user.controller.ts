import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const SECRET_KEY = "your_secret_key";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({ message: "User registered", user });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 3600,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Login successful", token });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const checkAuth = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", loggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: "Authorized", decoded, loggedIn: true });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", loggedIn: false });
  }
};

export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const user = await prisma.user.findUnique({ where: { email: userId } });
  res.json(user);
};
