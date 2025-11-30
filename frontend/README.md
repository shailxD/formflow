# FormFlow Frontend

A modern form builder application built with React, TypeScript, and the TanStack ecosystem.

## Overview

FormFlow is a drag-and-drop form builder that allows users to create, publish, and manage forms with ease. Key features include:

- **Form Builder**: Drag-and-drop interface with 8 field types (text, email, textarea, number, checkbox, select, slider, switch)
- **Form Preview**: Live preview of forms while building
- **Public Forms**: Shareable form links for collecting submissions
- **Submissions Management**: View submissions in table or card format with pagination
- **Dashboard**: Analytics with KPIs and submission trends chart
- **Authentication**: Login/signup with JWT-based authentication

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Routing | TanStack Router |
| State Management | Zustand |
| Server State | TanStack Query |
| Forms | TanStack Form + Zod |
| Tables | TanStack Table |
| UI Components | Shadcn UI |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Charts | Recharts |

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd formflow/frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```env
VITE_BACKEND_URL=http://localhost:3001
```

5. Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm check-types` | Type check without emitting |
| `pnpm format:check` | Check code formatting |
| `pnpm format:write` | Fix code formatting |
| `pnpm test` | Run tests |

## File Structure

```
src/
├── api/                    # API functions (axios calls)
│   ├── auth-api.ts         # Authentication APIs
│   ├── dashboard-api.ts    # Dashboard statistics APIs
│   └── form-api.ts         # Form & submission APIs
│
├── components/
│   ├── auth/               # Login/signup forms
│   ├── dashboard/          # Dashboard KPIs and charts
│   ├── f/                  # Public form components
│   ├── form-builder/       # Form builder components
│   │   ├── form-field-renderer/  # Field type renderers
│   │   ├── form-preview/   # Preview panel
│   │   └── toolbox/        # Field toolbox
│   ├── forms/              # Forms list page
│   ├── layout/             # App layout (sidebar, header)
│   ├── modals/             # Modal dialogs
│   ├── submissions/        # Submissions table/cards
│   ├── ui/                 # Shadcn UI components
│   └── ui-state/           # Loading, error, not-found states
│
├── hooks/
│   ├── mutations/          # useMutation hooks
│   │   ├── use-auth-mutation.ts
│   │   └── use-form-mutation.ts
│   └── queries/            # useQuery hooks
│       ├── use-dashboard.ts
│       └── use-forms.ts
│
├── integrations/
│   └── tanstack-query/     # React Query provider & devtools
│
├── lib/
│   ├── api-client.ts       # Axios instance with interceptors
│   └── utils/              # Utility functions
│
├── routes/                 # TanStack Router file-based routes
│   ├── __root.tsx          # Root layout
│   ├── _app.tsx            # Authenticated app layout
│   ├── _app/
│   │   ├── dashboard.tsx   # Dashboard page
│   │   ├── forms.tsx       # Forms list page
│   │   ├── form.$formId.tsx        # Submissions page
│   │   └── form-builder/$formId.tsx # Form builder page
│   ├── _auth.tsx           # Auth layout
│   ├── _auth/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── f.$slug.tsx         # Public form page
│   └── index.tsx           # Landing/redirect
│
├── store/                  # Zustand stores
│   ├── auth-store.ts       # Auth state (user, token)
│   ├── form-builder-store.ts # Form builder state
│   └── public-form-store.ts  # Public form state
│
├── types/                  # TypeScript types
│   └── form.ts             # Form-related types
│
├── main.tsx                # App entry point
├── routeTree.gen.ts        # Auto-generated route tree
└── styles.css              # Global styles
```

## Guidelines

### Adding Shadcn Components

```bash
pnpx shadcn@latest add <component-name>
```

### API Integration Pattern

1. Create API function in `src/api/`:
```typescript
export const getData = async (): Promise<Response> => {
  const response = await apiClient.get<Response>('/api/endpoint')
  return response.data
}
```

2. Create query hook in `src/hooks/queries/`:
```typescript
export const useData = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: getData,
  })
}
```

3. Use in component:
```tsx
const { data, isLoading } = useData()
```

### Commit Messages

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `ui:` - UI/styling changes
- `refactor:` - Code refactoring
- `chore:` - Config/dependency updates
- `docs:` - Documentation

### Code Style

- TypeScript with strict types
- Functional components with hooks
- Tailwind CSS for styling
- Prettier for formatting
- ESLint for linting

## License

MIT
