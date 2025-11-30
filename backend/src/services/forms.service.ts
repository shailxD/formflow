import { db } from "../db";
import { formsTable, submissionsTable, NewForm } from "../db/schema";
import { eq, or } from "drizzle-orm";

const VALID_TYPES = new Set([
  "text",
  "email",
  "number",
  "textarea",
  "select",
  "multi-select",
  "date",
  "switch",
]);

export const formsService = {
  validatePayload(payload: any) {
    if (!payload || typeof payload !== "object")
      throw new Error("Invalid payload");
    const { formDetails, formFields } = payload;
    if (
      !formDetails ||
      !formDetails.internalTitle ||
      typeof formDetails.internalTitle !== "string"
    ) {
      throw new Error("formDetails.internalTitle is required");
    }
    if (!Array.isArray(formFields))
      throw new Error("formFields must be an array");

    for (const f of formFields) {
      if (!f.id || !f.type || !f.label)
        throw new Error("Each field must have id, type and label");
      if (!VALID_TYPES.has(f.type))
        throw new Error(`Invalid field type: ${f.type}`);
      if (
        (f.type === "select" || f.type === "multi-select") &&
        !Array.isArray(f.defaultOptions)
      ) {
        throw new Error(
          `Field ${f.id} of type ${f.type} requires defaultOptions array`
        );
      }
    }

    return true;
  },

  async saveForm(payload: any, formId: string) {
    this.validatePayload(payload);

    const { formDetails, formFields } = payload;

    const formData = {
      internalTitle: formDetails.internalTitle,
      publicTitle: formDetails.publicTitle || null,
      description: formDetails.description || null,
      slug: formDetails.slug || null,
      isPublished: formDetails.isPublished ?? false,
      fields: JSON.stringify(formFields),
    };

    // Check if form exists
    const existing = await db
      .select()
      .from(formsTable)
      .where(eq(formsTable.id, formId))
      .get();

    if (existing) {
      // Update existing form
      const updated = await db
        .update(formsTable)
        .set(formData)
        .where(eq(formsTable.id, formId))
        .returning()
        .get();

      return { form: updated, isNew: false };
    }

    // Create new form with the provided formId
    const created = await db
      .insert(formsTable)
      .values({ id: formId, ...formData })
      .returning()
      .get();

    return { form: created, isNew: true };
  },

  async getFormByIdOrSlug(idOrSlug: string) {
    const form = await db
      .select()
      .from(formsTable)
      .where(or(eq(formsTable.id, idOrSlug), eq(formsTable.slug, idOrSlug)))
      .get();

    if (!form) {
      throw new Error("Form not found");
    }

    return form;
  },

  async getAllForms() {
    const forms = await db.select().from(formsTable).all();
    return forms;
  },

  async deleteForm(idOrSlug: string) {
    // Find the form by id or slug
    const form = await db
      .select()
      .from(formsTable)
      .where(or(eq(formsTable.id, idOrSlug), eq(formsTable.slug, idOrSlug)))
      .get();

    if (!form) {
      throw new Error("Form not found");
    }

    // Delete all submissions for this form first
    await db
      .delete(submissionsTable)
      .where(eq(submissionsTable.formId, form.id));

    // Delete the form
    await db.delete(formsTable).where(eq(formsTable.id, form.id));

    return { formId: form.id };
  },
};
