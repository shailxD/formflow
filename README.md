# FormFlow

A full-stack dynamic form builder system with a React frontend and Node.js backend.

## 🔗 Live Demo & Deployment

|                   | Link                                                                             |
| ----------------- | -------------------------------------------------------------------------------- |
| 🎥 **Demo Video** | [Watch on Loom](https://www.loom.com/share/7e73a7e867174cfb82619620357e16c5)     |
| 🌐 **Frontend**   | [formflow-teal.vercel.app](https://formflow-teal.vercel.app/)                    |
| ⚙️ **Backend**    | [formflow-backend-b921.onrender.com](https://formflow-backend-b921.onrender.com) |

---

## 🎯 Milestone Completion Status

### Milestone 1 — Frontend Development ✅

| Feature                                                                                               | Status      |
| ----------------------------------------------------------------------------------------------------- | ----------- |
| **Dynamic Form Page**                                                                                 | ✅ Complete |
| Form Schema Fetching (GET /api/form-schema)                                                           | ✅          |
| Loading and error states                                                                              | ✅          |
| TanStack Query integration                                                                            | ✅          |
| **Dynamic Form Rendering**                                                                            | ✅ Complete |
| TanStack Form for state management                                                                    | ✅          |
| All 8 field types (text, number, select, multi-select, date, textarea, switch)                        | ✅          |
| Labels, placeholders, required indicators                                                             | ✅          |
| Inline validation error messages                                                                      | ✅          |
| Validation rules (minLength, maxLength, regex, min, max, minDate, minSelected, maxSelected, required) | ✅          |
| **Submission Requirements**                                                                           | ✅ Complete |
| Disable submit button during submission                                                               | ✅          |
| Loading indicator                                                                                     | ✅          |
| Success/error messages                                                                                | ✅          |
| Clear form after successful submission                                                                | ✅          |
| Navigate to submissions page                                                                          | ✅          |
| **Submissions Table Page**                                                                            | ✅ Complete |
| TanStack Query integration                                                                            | ✅          |
| TanStack Table implementation                                                                         | ✅          |
| Submission ID, Created Date, View columns                                                             | ✅          |
| Server-side pagination                                                                                | ✅          |
| Server-side sorting on createdAt                                                                      | ✅          |
| Page info (current page, total pages)                                                                 | ✅          |
| Items per page selector (10/20/50)                                                                    | ✅          |
| Previous/Next buttons                                                                                 | ✅          |
| Total submissions count                                                                               | ✅          |
| Loading, error, and empty states                                                                      | ✅          |

### Milestone 2 — Backend Development ✅

| Feature                                                                           | Status      |
| --------------------------------------------------------------------------------- | ----------- |
| **GET /api/form-schema**                                                          | ✅ Complete |
| Returns Employee Onboarding form schema                                           | ✅          |
| Title, description, fields with labels, types, placeholders, options, validations | ✅          |
| All field types (text, number, select, multi-select, date, textarea, switch)      | ✅          |
| All validation rules supported                                                    | ✅          |
| **POST /api/submissions**                                                         | ✅ Complete |
| Validates against form schema                                                     | ✅          |
| Generates unique submission ID                                                    | ✅          |
| Stores createdAt timestamp                                                        | ✅          |
| Returns success (201) or validation errors (400)                                  | ✅          |
| **GET /api/submissions**                                                          | ✅ Complete |
| Server-side pagination (page, limit)                                              | ✅          |
| Sorting by createdAt (asc/desc)                                                   | ✅          |
| Total count and total pages                                                       | ✅          |
| Graceful handling of invalid parameters                                           | ✅          |

### Bonus Features ✅

| Feature                                | Status |
| -------------------------------------- | ------ |
| Dark mode                              | ✅     |
| Form Builder (drag-and-drop)           | ✅     |
| Dashboard with KPIs and charts         | ✅     |
| Authentication (signup, login, logout) | ✅     |

---

## 🛠️ Tech Stack

### Frontend

| Category         | Technology            |
| ---------------- | --------------------- |
| Framework        | React 19 + TypeScript |
| Build Tool       | Vite 7                |
| Routing          | TanStack Router       |
| Server State     | TanStack Query        |
| Forms            | TanStack Form + Zod   |
| Tables           | TanStack Table        |
| UI Components    | Shadcn UI             |
| Styling          | Tailwind CSS v4       |
| State Management | Zustand               |
| HTTP Client      | Axios                 |
| Charts           | Recharts              |

### Backend

| Category       | Technology              |
| -------------- | ----------------------- |
| Runtime        | Node.js                 |
| Language       | TypeScript              |
| Framework      | Express 5.x             |
| Database       | SQLite (@libsql/client) |
| ORM            | Drizzle ORM             |
| Authentication | JWT + bcryptjs          |

---

## 📁 Repository Structure

```
formflow/
├── backend/                # Node.js + Express API server
│   ├── src/
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Express middleware
│   │   ├── db/             # Drizzle schema & client
│   │   └── config/         # Environment configuration
│   ├── package.json
│   └── README.md
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── api/            # API functions (axios)
│   │   ├── components/     # React components
│   │   ├── hooks/          # Query & mutation hooks
│   │   ├── routes/         # TanStack Router pages
│   │   ├── store/          # Zustand stores
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

---

## 🚀 Setup & Run Instructions

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env and set JWT_SECRET to a secure value

# Initialize the database
pnpm db:push

# Start development server
pnpm dev
```

The backend will run at `http://localhost:3001`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env and set VITE_BACKEND_URL=http://localhost:3001

# Start development server
pnpm dev
```

The frontend will run at `http://localhost:3000`

---

## 📋 API Endpoints

### Form Schema

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/form-schema`         | Get all forms          |
| GET    | `/api/form-schema/:formId` | Get form by ID or slug |
| POST   | `/api/form-schema`         | Create or update form  |

### Submissions

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| GET    | `/api/submissions`         | Get all submissions (paginated) |
| GET    | `/api/submissions/:formId` | Get submissions for a form      |
| POST   | `/api/submissions/:formId` | Submit a form response          |

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortOrder` - `asc` or `desc` (default: desc)

### Authentication

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/auth/signup` | Register a new user     |
| POST   | `/api/auth/login`  | Login and get JWT token |
| POST   | `/api/auth/logout` | Logout                  |

### Dashboard

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| GET    | `/api/dashboard/stats`  | Get KPI statistics    |
| GET    | `/api/dashboard/trends` | Get submission trends |

---

## ⚠️ Known Issues

- None at this time

---

## 📝 Assumptions

1. The form schema structure follows the assignment specification with all 8 field types
2. SQLite is used for lightweight data persistence
3. JWT tokens are used for authentication with tokens stored client-side
4. Server-side pagination and sorting are implemented for the submissions endpoint
5. The "Employee Onboarding" form is seeded as the default form schema

---

## 📄 License

MIT
