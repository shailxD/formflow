import { Router } from "express";
import { submissionsController } from "../controllers/submissions.controller";

export const submissionsRoutes = Router();

// Get all submissions with pagination
submissionsRoutes.get("/", submissionsController.getAll);

// Submit a response to a published form (public endpoint)
submissionsRoutes.post("/:formId", submissionsController.create);

// Get all submissions for a form by formId or slug
submissionsRoutes.get("/:formId", submissionsController.getByFormId);
