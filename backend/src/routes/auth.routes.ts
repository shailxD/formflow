import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
