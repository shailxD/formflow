import { db } from "../db";
import { formsTable, submissionsTable } from "../db/schema";
import { eq, or, count, asc, desc } from "drizzle-orm";

interface PaginationParams {
  page: number;
  limit: number;
  sortBy: "submittedAt";
  sortOrder: "asc" | "desc";
}

export const submissionsService = {
  async getAllSubmissions(params: PaginationParams) {
    const { page, limit, sortBy, sortOrder } = params;
    const offset = (page - 1) * limit;

    // Get total count
    const totalResult = await db
      .select({ count: count() })
      .from(submissionsTable)
      .get();
    const totalCount = totalResult?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated submissions with sorting
    const orderFn = sortOrder === "asc" ? asc : desc;
    const submissions = await db
      .select()
      .from(submissionsTable)
      .orderBy(orderFn(submissionsTable.submittedAt))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      submissions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    };
  },

  async createSubmission(formIdOrSlug: string, data: Record<string, any>) {
    // Find the form by id or slug
    const form = await db
      .select()
      .from(formsTable)
      .where(
        or(eq(formsTable.id, formIdOrSlug), eq(formsTable.slug, formIdOrSlug))
      )
      .get();

    if (!form) {
      throw new Error("Form not found");
    }

    if (!form.isPublished) {
      throw new Error("Form is not published");
    }

    // Validate submission data against form fields
    const formFields = JSON.parse(form.fields) as Array<{
      id: string;
      type: string;
      label: string;
      required?: boolean;
    }>;

    for (const field of formFields) {
      if (
        field.required &&
        (data[field.id] === undefined || data[field.id] === "")
      ) {
        throw new Error(`Field "${field.label}" is required`);
      }
    }

    // Create the submission
    const submission = await db
      .insert(submissionsTable)
      .values({
        formId: form.id,
        data: JSON.stringify(data),
      })
      .returning()
      .get();

    return submission;
  },

  async getSubmissionsByFormIdOrSlug(
    formIdOrSlug: string,
    params: PaginationParams
  ) {
    const { page, limit, sortOrder } = params;
    const offset = (page - 1) * limit;

    // First find the form by id or slug
    const form = await db
      .select()
      .from(formsTable)
      .where(
        or(eq(formsTable.id, formIdOrSlug), eq(formsTable.slug, formIdOrSlug))
      )
      .get();

    if (!form) {
      throw new Error("Form not found");
    }

    // Get total count for this form
    const totalResult = await db
      .select({ count: count() })
      .from(submissionsTable)
      .where(eq(submissionsTable.formId, form.id))
      .get();
    const totalCount = totalResult?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated submissions with sorting
    const orderFn = sortOrder === "asc" ? asc : desc;
    const submissions = await db
      .select()
      .from(submissionsTable)
      .where(eq(submissionsTable.formId, form.id))
      .orderBy(orderFn(submissionsTable.submittedAt))
      .limit(limit)
      .offset(offset)
      .all();

    return {
      submissions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    };
  },
};
