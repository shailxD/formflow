# Project Instructions

You are working inside a **React + TypeScript** project using **TanStack ecosystem** and **Shadcn UI**.

---

## Tech Stack

- **UI Components**: Shadcn UI
- **Forms**: TanStack Form + Zod validation
- **Tables**: TanStack Table
- **API Integration**: TanStack Query (React Query)
- **Routing**: TanStack Router
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

---

## Shadcn UI Components

When generating UI components, always use Shadcn components:

```bash
pnpx shadcn@latest add <component-name>
```

Examples:

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add input
pnpx shadcn@latest add field  # For form fields
```

**Guidelines:**

- Always prefer Shadcn components over plain HTML or other libraries
- Use Shadcn's Field components for forms: `Field`, `FieldLabel`, `FieldError`, `FieldGroup`, `FieldDescription`
- Refer to [Shadcn documentation](https://ui.shadcn.com) for best practices

---

## Forms with TanStack Form + Zod

Use **TanStack Form** for all form handling with **Zod** for validation.

### Form Structure

```tsx
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

function MyForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: schema, // Form-level validation
    },
    onSubmit: async ({ value }) => {
      // Handle submission
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>
      </FieldGroup>
    </form>
  )
}
```

**Guidelines:**

- Use form-level validation with `validators: { onSubmit: schema }`
- Wrap form content in `<FieldGroup>` for proper spacing
- Use `<Field data-invalid={isInvalid}>` wrapper for each field
- Use `<FieldError errors={field.state.meta.errors} />` for error display
- Always add `name` attribute to inputs for accessibility
- Reference: [Shadcn TanStack Form docs](https://ui.shadcn.com/docs/forms/tanstack-form)

---

## API Integration with TanStack Query

### Project Structure

```
src/
├── api/
│   ├── auth.ts              # Auth API functions
│   ├── users.ts             # Users API functions
│   └── ...
├── lib/
│   └── api-client.ts        # Axios instance
├── hooks/
│   ├── mutations/
│   │   ├── use-login.ts     # useMutation hooks
│   │   └── ...
│   └── queries/
│       ├── use-user.ts      # useQuery hooks
│       └── ...
└── types/
    ├── auth.ts              # Auth-related types
    ├── user.ts              # User-related types
    └── ...
```

### API Functions (`src/api/`)

Create API functions that return promises:

```typescript
// src/api/auth.ts
import apiClient from '@/lib/api-client'
import type { LoginRequest, AuthResponse } from '@/types/auth'

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', data)
  return response.data
}

export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/api/auth/signup', data)
  return response.data
}
```

### TanStack Query Hooks

**Mutations** (`src/hooks/mutations/`):

```typescript
// src/hooks/mutations/use-login.ts
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/auth'
import useAuthStore from '@/store/auth-store'

export const useLogin = () => {
  const { setAuth } = useAuthStore()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
  })
}
```

**Queries** (`src/hooks/queries/`):

```typescript
// src/hooks/queries/use-user.ts
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/users'

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  })
}
```

### Using in Components

```tsx
import { useLogin } from '@/hooks/mutations/use-login'

function LoginForm() {
  const loginMutation = useLogin()

  const onSubmit = async (values) => {
    await loginMutation.mutateAsync(values)
  }

  return (
    <div>
      {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
      <Button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </div>
  )
}
```

**Guidelines:**

- API functions go in `src/api/`
- TanStack Query hooks go in `src/hooks/mutations/` or `src/hooks/queries/`
- Define types in `src/types/`
- Use `useMutation` for POST/PUT/DELETE operations
- Use `useQuery` for GET operations
- Always handle loading and error states

---

## Types (`src/types/`)

Define TypeScript types/interfaces for API requests and responses:

```typescript
// src/types/auth.ts
export interface User {
  id: string
  email: string
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}
```

---

## Commit Message Format

Use conventional commit style for clarity and maintainability:

| Type          | When to Use                              |
| ------------- | ---------------------------------------- |
| **feat:**     | Add a new feature or page                |
| **fix:**      | Bug fixes                                |
| **ui:**       | UI enhancements or styling changes       |
| **refactor:** | Code improvements without feature change |
| **chore:**    | Config, setup, dependency updates        |
| **docs:**     | README or documentation changes          |
| **style:**    | Formatting, naming, code style only      |

### Examples

```
feat: add login form with TanStack Form
feat: implement user query hooks
ui: improve table layout with TanStack Table
refactor: extract auth API functions
chore: add axios interceptor for auth tokens
```

---

## General Guidelines

- **TypeScript First**: All code should be written in TypeScript with proper types
- **Accessibility**: Prioritize ARIA labels, semantic HTML, and keyboard navigation
- **Component Structure**: Keep components small, focused, and reusable
- **Error Handling**: Always handle loading and error states in API calls
- **Code Organization**: Follow the established folder structure strictly
- **Documentation**: When in doubt, refer to official documentation:
  - [TanStack Form](https://tanstack.com/form)
  - [TanStack Query](https://tanstack.com/query)
  - [TanStack Table](https://tanstack.com/table)
  - [Shadcn UI](https://ui.shadcn.com)
- **Clean Code**: Use descriptive names, avoid magic numbers, and keep functions pure when possible
