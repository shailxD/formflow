import { Request, Response, NextFunction } from "express";
import { submissionsService } from "../services/submissions.service";

export const submissionsController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse and validate query parameters with defaults
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      const sortBy = "submittedAt" as const; // Only sortBy supported for now
      let sortOrder = (req.query.sortOrder as string)?.toLowerCase();

      // Graceful handling of invalid parameters
      if (page < 1) page = 1;
      if (limit < 1) limit = 10;
      if (limit > 100) limit = 100; // Max limit
      if (sortOrder !== "asc" && sortOrder !== "desc") sortOrder = "desc";

      const result = await submissionsService.getAllSubmissions({
        page,
        limit,
        sortBy,
        sortOrder: sortOrder as "asc" | "desc",
      });

      const data = result.submissions.map((s) => ({
        submissionId: s.id,
        formId: s.formId,
        data: JSON.parse(s.data),
        submittedAt: s.submittedAt.toISOString(),
      }));

      res.status(200).json({
        success: true,
        data,
        pagination: result.pagination,
      });
    } catch (err: any) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      const { data } = req.body;

      if (!formId) {
        return res
          .status(400)
          .json({ success: false, message: "formId or slug is required" });
      }

      if (!data || typeof data !== "object") {
        return res
          .status(400)
          .json({ success: false, message: "data object is required" });
      }

      const submission = await submissionsService.createSubmission(
        formId,
        data
      );

      res.status(201).json({
        success: true,
        message: "Submission received",
        data: {
          submissionId: submission.id,
          formId: submission.formId,
          submittedAt: submission.submittedAt.toISOString(),
        },
      });
    } catch (err: any) {
      if (err.message === "Form not found") {
        return res.status(404).json({ success: false, message: err.message });
      }
      if (err.message === "Form is not published") {
        return res.status(403).json({ success: false, message: err.message });
      }
      if (err.message.includes("is required")) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  async getByFormId(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;

      if (!formId) {
        return res
          .status(400)
          .json({ success: false, message: "formId or slug is required" });
      }

      // Parse and validate query parameters with defaults
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      const sortBy = "submittedAt" as const;
      let sortOrder = (req.query.sortOrder as string)?.toLowerCase();

      // Graceful handling of invalid parameters
      if (page < 1) page = 1;
      if (limit < 1) limit = 10;
      if (limit > 100) limit = 100;
      if (sortOrder !== "asc" && sortOrder !== "desc") sortOrder = "desc";

      const result = await submissionsService.getSubmissionsByFormIdOrSlug(
        formId,
        { page, limit, sortBy, sortOrder: sortOrder as "asc" | "desc" }
      );

      const data = result.submissions.map((s) => ({
        submissionId: s.id,
        formId: s.formId,
        data: JSON.parse(s.data),
        submittedAt: s.submittedAt.toISOString(),
      }));

      res.status(200).json({
        success: true,
        data,
        pagination: result.pagination,
      });
    } catch (err: any) {
      if (err.message === "Form not found") {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  },
};
