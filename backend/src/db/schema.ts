import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const formsTable = sqliteTable("forms", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  internalTitle: text("internal_title").notNull(),
  publicTitle: text("public_title"),
  description: text("description"),
  slug: text("slug"),
  isPublished: int("is_published", { mode: "boolean" })
    .notNull()
    .default(false),
  fields: text("fields").notNull(), // JSON string of formFields array
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Form = typeof formsTable.$inferSelect;
export type NewForm = typeof formsTable.$inferInsert;

export const submissionsTable = sqliteTable("submissions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  formId: text("form_id")
    .notNull()
    .references(() => formsTable.id),
  data: text("data").notNull(), // JSON string of submission data
  submittedAt: int("submitted_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Submission = typeof submissionsTable.$inferSelect;
export type NewSubmission = typeof submissionsTable.$inferInsert;
