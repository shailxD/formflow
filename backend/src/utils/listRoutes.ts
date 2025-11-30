import { Express, Router } from "express";

export function getRoutes(app: Express | Router): any[] {
  return [
    // Auth
    {
      path: "/api/auth/signup",
      methods: ["POST"],
      description: "Register a new user",
    },
    {
      path: "/api/auth/login",
      methods: ["POST"],
      description: "Login and receive a JWT token",
    },
    {
      path: "/api/auth/logout",
      methods: ["POST"],
      description: "Logout user",
    },
    // Forms
    {
      path: "/api/form-schema",
      methods: ["GET"],
      description: "Get all forms",
    },
    {
      path: "/api/form-schema/:formId",
      methods: ["GET"],
      description: "Get form by ID or slug",
    },
    {
      path: "/api/form-schema",
      methods: ["POST"],
      description: "Create or update form (upsert)",
    },
    // Submissions
    {
      path: "/api/submissions",
      methods: ["GET"],
      description: "Get all submissions (paginated)",
    },
    {
      path: "/api/submissions/:formId",
      methods: ["GET"],
      description: "Get submissions for a form (paginated)",
    },
    {
      path: "/api/submissions/:formId",
      methods: ["POST"],
      description: "Submit a response to a published form",
    },
    // Dashboard
    {
      path: "/api/dashboard/stats",
      methods: ["GET"],
      description: "Get KPI statistics",
    },
    {
      path: "/api/dashboard/trends",
      methods: ["GET"],
      description: "Get submission trends",
    },
  ];
}
