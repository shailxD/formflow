import AuthContainer from '@/components/auth/auth-container'
import { PublicRoute } from '@/components/route-guards'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PublicRoute>
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    </PublicRoute>
  )
}
