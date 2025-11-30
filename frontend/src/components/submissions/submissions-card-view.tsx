import { formatDistanceToNow } from 'date-fns'
import { FileText } from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { Submission } from '@/types/form'

interface SubmissionCardProps {
  submission: Submission
}

function SubmissionCard({ submission }: SubmissionCardProps) {
  const entries = Object.entries(submission.data).filter(
    ([_, value]) => value !== '' && value !== null && value !== undefined,
  )

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            #{submission.submissionId.slice(0, 8)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(submission.submittedAt), {
            addSuffix: true,
          })}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map(([fieldId, value]) => (
          <div key={fieldId} className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {fieldId.split('-')[0]}
            </span>
            <span className="text-sm">
              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

interface SubmissionsCardViewProps {
  submissions: Submission[]
}

export function SubmissionsCardView({ submissions }: SubmissionsCardViewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.submissionId} submission={submission} />
      ))}
    </div>
  )
}
