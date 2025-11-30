import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { formsRoutes } from "./forms.routes";
import { submissionsRoutes } from "./submissions.routes";
import { dashboardRoutes } from "./dashboard.routes";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/form-schema", formsRoutes);
router.use("/forms", formsRoutes);
router.use("/submissions", submissionsRoutes);
router.use("/dashboard", dashboardRoutes);
