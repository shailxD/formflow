import { Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";

export const dashboardRoutes = Router();

// Get dashboard KPI stats
dashboardRoutes.get("/stats", dashboardController.getStats);

// Get submission trends for chart
dashboardRoutes.get("/trends", dashboardController.getTrends);
