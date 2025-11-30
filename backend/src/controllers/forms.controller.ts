import { Request, Response, NextFunction } from "express";
import { formsService } from "../services/forms.service";

export const formsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const { formId } = payload;

      if (!formId) {
        return res
          .status(400)
          .json({ success: false, message: "formId is required" });
      }

      await formsService.validatePayload(payload);
      const { form, isNew } = await formsService.saveForm(payload, formId);

      // createdAt/updatedAt are Date objects from Drizzle
      const createdAtIso = form.createdAt.toISOString();
      const updatedAtIso = form.updatedAt.toISOString();

      res.status(isNew ? 201 : 200).json({
        success: true,
        message: isNew
          ? "Form created successfully"
          : "Form updated successfully",
        data: {
          formId: form.id,
          createdAt: createdAtIso,
          updatedAt: updatedAtIso,
        },
      });
    } catch (err: any) {
      if (err.message && err.message.startsWith("form")) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      if (!formId) {
        return res
          .status(400)
          .json({ success: false, message: "formId is required" });
      }

      const form = await formsService.getFormByIdOrSlug(formId);

      res.status(200).json({
        success: true,
        data: {
          formId: form.id,
          formDetails: {
            internalTitle: form.internalTitle,
            publicTitle: form.publicTitle,
            description: form.description,
            slug: form.slug,
            isPublished: form.isPublished,
          },
          formFields: JSON.parse(form.fields),
          createdAt: form.createdAt.toISOString(),
          updatedAt: form.updatedAt.toISOString(),
        },
      });
    } catch (err: any) {
      if (err.message === "Form not found") {
        return res.status(404).json({ success: false, message: err.message });
      }
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const forms = await formsService.getAllForms();

      const data = forms.map((form) => ({
        formId: form.id,
        formDetails: {
          internalTitle: form.internalTitle,
          publicTitle: form.publicTitle,
          description: form.description,
          slug: form.slug,
          isPublished: form.isPublished,
        },
        formFields: JSON.parse(form.fields),
        createdAt: form.createdAt.toISOString(),
        updatedAt: form.updatedAt.toISOString(),
      }));

      res.status(200).json({
        success: true,
        data,
      });
    } catch (err: any) {
      next(err);
    }
  },
};
