# Copilot Instructions – FormFlow

You are working in a repository called **FormFlow**, which contains two separate apps:

- `frontend/` → Vite + React + TypeScript app using TanStack Router, TanStack Query, Tailwind, and Shadcn UI.
- `backend/` → Node.js + TypeScript API server using Express and Drizzle ORM with SQLite.

This is **not** a monorepo with shared packages; it is a single repo that contains two independent projects (frontend and backend) in separate folders.

---

## Project Layout

- `frontend/`

  - Vite + React + TypeScript.
  - TanStack Router for routing.
  - TanStack Query for data fetching.
  - Tailwind CSS and Shadcn UI for styling and components.
  - Follow the detailed frontend instructions in:
    - `frontend/.github/copilot-instructions.md`

- `backend/`
  - Node.js + TypeScript.
  - Express for HTTP server and routing.
  - Drizzle ORM with SQLite database.
  - Will expose REST APIs, including authentication (signup, login, logout) and form/submission-related endpoints.
  - Follow the detailed backend instructions in:
    - `backend/.github/copilot-instructions.md`

---

## General Guidelines

- Use **TypeScript** wherever possible (both frontend and backend).
- Prefer clear separation of concerns:
  - For backend: routes, controllers/handlers, services, and database access (Drizzle) should be split logically.
  - For frontend: favor feature-based structure and reusable components.
- Write code that is easy to test and understand.

---

## Commit Message Format

Use **conventional commit** messages for all changes:

- `feat:` – Add a new feature or page.
- `fix:` – Bug fixes.
- `ui:` – UI enhancements or styling changes.
- `refactor:` – Code improvements without changing behavior.
- `chore:` – Config, setup, dependency updates.
- `docs:` – README or documentation changes.
- `style:` – Formatting, naming, or code style only.

Examples:

- `feat: add dynamic form rendering for onboarding`
- `feat: implement login and signup API`
- `ui: update table layout with Shadcn components`
- `docs: add setup instructions for backend`

When generating changes, pick the most appropriate commit type and keep messages concise but descriptive.
