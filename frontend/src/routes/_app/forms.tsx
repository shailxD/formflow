import { Forms, FormsHeader } from '@/components/forms'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/forms')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <FormsHeader />
      <Forms />
    </div>
  )
}
