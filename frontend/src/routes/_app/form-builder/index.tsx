import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/form-builder/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/forms" />
}
