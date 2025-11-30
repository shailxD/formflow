import { Request, Response, NextFunction } from "express";
import { dashboardService } from "../services/dashboard.service";

export const dashboardController = {
  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await dashboardService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (err: any) {
      next(err);
    }
  },

  async getTrends(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse days parameter with default of 7
      let days = parseInt(req.query.days as string) || 7;

      // Validate days parameter
      if (days < 1) days = 7;
      if (days > 365) days = 365;

      const trends = await dashboardService.getTrends(days);

      res.status(200).json({
        success: true,
        data: trends,
      });
    } catch (err: any) {
      next(err);
    }
  },
};
