import { Router } from "express";
import { formsController } from "../controllers/forms.controller";

export const formsRoutes = Router();

// Accepts form configuration and stores it
formsRoutes.post("/", formsController.create);

// Get all forms
formsRoutes.get("/", formsController.getAll);

// Get form by ID
formsRoutes.get("/:formId", formsController.getById);

// Delete form by ID or slug (also deletes all submissions)
formsRoutes.delete("/:formId", formsController.delete);

export default formsRoutes;
