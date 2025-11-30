# FormFlow Backend

A Node.js + TypeScript API server for the FormFlow form builder application.

## Overview

This backend provides RESTful APIs for:

- **Authentication** - User signup, login, and logout with JWT tokens
- **Form Management** - Create, update, and retrieve form schemas
- **Submissions** - Accept and manage form submissions from public users
- **Dashboard** - KPI statistics and submission trends

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express 5.x
- **Database**: SQLite (via `@libsql/client`)
- **ORM**: Drizzle ORM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your `JWT_SECRET` to a secure value.

4. **Initialize the database**

   ```bash
   pnpm db:push
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   The server will run at `http://localhost:3001`

## Scripts

| Script           | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Start development server with hot reload    |
| `pnpm build`     | Build TypeScript to JavaScript              |
| `pnpm start`     | Run production build                        |
| `pnpm db:push`   | Push schema changes to database             |
| `pnpm db:studio` | Open Drizzle Studio for database management |

## File Structure

```
backend/
├── .env                    # Environment variables (git-ignored)
├── .env.example            # Example environment variables
├── drizzle.config.ts       # Drizzle Kit configuration
├── local.db                # SQLite database file (git-ignored)
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts              # Express app setup (middleware, routes)
    ├── server.ts           # Server entry point (listen)
    ├── config/
    │   └── env.ts          # Environment variable helpers
    ├── db/
    │   ├── index.ts        # Drizzle client instance
    │   └── schema.ts       # Database schema definitions
    ├── routes/
    │   ├── index.ts        # Route aggregator
    │   ├── auth.routes.ts  # Authentication routes
    │   ├── forms.routes.ts # Form schema routes
    │   ├── submissions.routes.ts
    │   └── dashboard.routes.ts
    ├── controllers/
    │   ├── auth.controller.ts
    │   ├── forms.controller.ts
    │   ├── submissions.controller.ts
    │   └── dashboard.controller.ts
    ├── services/
    │   ├── auth.service.ts
    │   ├── forms.service.ts
    │   ├── submissions.service.ts
    │   └── dashboard.service.ts
    ├── middleware/
    │   └── errorHandler.ts # Global error handling
    └── utils/
        └── listRoutes.ts   # Route listing utility
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/api/auth/signup` | Register a new user                |
| POST   | `/api/auth/login`  | Login and get JWT token            |
| POST   | `/api/auth/logout` | Logout (client-side token removal) |

### Forms

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| GET    | `/api/form-schema`         | Get all forms                  |
| GET    | `/api/form-schema/:formId` | Get form by ID or slug         |
| POST   | `/api/form-schema`         | Create or update form (upsert) |

### Submissions

| Method | Endpoint                   | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| GET    | `/api/submissions`         | Get all submissions (paginated)        |
| GET    | `/api/submissions/:formId` | Get submissions for a form (paginated) |
| POST   | `/api/submissions/:formId` | Submit a response to a published form  |

**Query Parameters for Submissions:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sortOrder` - Sort order: `asc` or `desc` (default: desc)

### Dashboard

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/dashboard/stats`  | Get KPI statistics    |
| GET    | `/api/dashboard/trends` | Get submission trends |

**Query Parameters for Trends:**

- `days` - Number of days (default: 7, max: 365)

## Architecture Guidelines

### Separation of Concerns

- **Routes** - Define endpoints and attach controllers
- **Controllers** - Handle HTTP request/response, call services
- **Services** - Business logic and database interactions
- **Middleware** - Cross-cutting concerns (auth, error handling)

### Database Schema

The application uses three main tables:

- `users` - User accounts for authentication
- `forms` - Form schemas with fields stored as JSON
- `submissions` - Form submissions with data stored as JSON

### Error Handling

All errors are caught by the global error handler middleware and returned in a consistent format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... }  // Optional, for paginated endpoints
}
```

## Development Guidelines

1. **Use TypeScript types** for request bodies, responses, and service functions
2. **Keep Drizzle queries in services**, not in controllers or routes
3. **Use async/await** with proper error handling
4. **Return JSON only** - no HTML responses
5. **Use proper HTTP status codes**:
   - `200` - Success
   - `201` - Created
   - `400` - Bad request / Validation error
   - `401` - Unauthorized
   - `403` - Forbidden
   - `404` - Not found
   - `500` - Server error

## License

ISC
