import { createFileRoute, Navigate } from '@tanstack/react-router'
import useAuthStore from '@/store/auth-store'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isAuthenticated } = useAuthStore()

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} />
}
