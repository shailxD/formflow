import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const { user, token } = await authService.signup({
        username,
        email,
        passwordHash: password,
      });
      res.status(201).json({
        message: "User created successfully",
        token,
        user: { id: user.id, email: user.email, username: user.username },
      });
    } catch (error: any) {
      if (error.message === "User already exists") {
        res.status(409).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }
      const { user, token } = await authService.login(email, password);
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, username: user.username },
      });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        res.status(401).json({ message: error.message });
      } else {
        next(error);
      }
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout();
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  },
};
