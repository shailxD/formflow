import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { LayoutGrid, Table } from 'lucide-react'

import {
  SubmissionsCardView,
  SubmissionsEmptyState,
  SubmissionsTableView,
  TablePagination,
} from '@/components/submissions'
import { Spinner } from '@/components/ui/spinner'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useSubmissions } from '@/hooks/queries/use-forms'

export const Route = createFileRoute('/_app/form/$formId')({
  component: RouteComponent,
})

const ITEMS_PER_PAGE = 10

function RouteComponent() {
  const { formId } = Route.useParams()

  return <SubmissionsContent formId={formId} />
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner className="size-6" />
    </div>
  )
}

type ViewMode = 'card' | 'table'

function SubmissionsContent({ formId }: { formId: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSubmissions(formId, {
    page,
    limit: ITEMS_PER_PAGE,
    sortOrder: 'desc',
  })

  const submissions = data?.data ?? []
  const pagination = data?.pagination

  const startIndex = pagination ? (pagination.page - 1) * pagination.limit : 0
  const endIndex = startIndex + submissions.length

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Submissions</h1>
          <p className="text-sm text-muted-foreground">
            {pagination?.totalCount ?? 0} response
            {(pagination?.totalCount ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>

        {submissions.length > 0 && (
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: string) =>
              value && setViewMode(value as ViewMode)
            }
          >
            <ToggleGroupItem value="table" aria-label="Table view">
              <Table className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      </div>

      {submissions.length === 0 ? (
        <SubmissionsEmptyState />
      ) : (
        <>
          {viewMode === 'table' ? (
            <SubmissionsTableView submissions={submissions} />
          ) : (
            <SubmissionsCardView submissions={submissions} />
          )}

          {pagination && pagination.totalPages > 1 && (
            <TablePagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={pagination.totalCount}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  )
}
