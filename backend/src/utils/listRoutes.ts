import { Express, Router } from "express";

export function getRoutes(app: Express | Router): any[] {
  return [
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
  ];
}
