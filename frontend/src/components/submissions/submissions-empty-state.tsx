import { Inbox } from 'lucide-react'

export function SubmissionsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted">
        <Inbox className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">No submissions yet</h3>
      <p className="text-sm text-muted-foreground">
        Submissions will appear here once users start filling out your form.
      </p>
    </div>
  )
}
