import { db } from "../db";
import { formsTable, submissionsTable } from "../db/schema";
import { count, gte, sql } from "drizzle-orm";

export const dashboardService = {
  async getStats() {
    // Total submissions
    const totalSubmissionsResult = await db
      .select({ count: count() })
      .from(submissionsTable)
      .get();
    const totalSubmissions = totalSubmissionsResult?.count || 0;

    // Total forms
    const totalFormsResult = await db
      .select({ count: count() })
      .from(formsTable)
      .get();
    const totalForms = totalFormsResult?.count || 0;

    // Total form fields (sum of all fields across all forms)
    const allForms = await db
      .select({ fields: formsTable.fields })
      .from(formsTable)
      .all();
    let totalFormFields = 0;
    for (const form of allForms) {
      try {
        const fields = JSON.parse(form.fields);
        if (Array.isArray(fields)) {
          totalFormFields += fields.length;
        }
      } catch {
        // Skip invalid JSON
      }
    }

    // Last 30 days submissions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const last30DaysResult = await db
      .select({ count: count() })
      .from(submissionsTable)
      .where(gte(submissionsTable.submittedAt, thirtyDaysAgo))
      .get();
    const last30DaysSubmissions = last30DaysResult?.count || 0;

    // Average daily submissions (last 30 days)
    const avgDailySubmissions =
      Math.round((last30DaysSubmissions / 30) * 10) / 10;

    return {
      totalSubmissions,
      totalForms,
      totalFormFields,
      last30DaysSubmissions,
      avgDailySubmissions,
    };
  },

  async getTrends(days: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    // Get all submissions from the last N days
    const submissions = await db
      .select({ submittedAt: submissionsTable.submittedAt })
      .from(submissionsTable)
      .where(gte(submissionsTable.submittedAt, startDate))
      .all();

    // Create a map of date -> count
    const dateCountMap: Record<string, number> = {};

    // Initialize all dates with 0
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - days + 1 + i);
      const dateStr = date.toISOString().split("T")[0];
      dateCountMap[dateStr] = 0;
    }

    // Count submissions per date
    for (const submission of submissions) {
      const dateStr = submission.submittedAt.toISOString().split("T")[0];
      if (dateCountMap[dateStr] !== undefined) {
        dateCountMap[dateStr]++;
      }
    }

    // Convert to array format
    const trends = Object.entries(dateCountMap)
      .map(([date, count]) => ({ date, submissions: count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return trends;
  },
};
