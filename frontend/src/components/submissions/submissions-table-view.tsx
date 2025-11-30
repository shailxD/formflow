import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Submission } from '@/types/form'

interface SubmissionsTableViewProps {
  submissions: Submission[]
}

export function SubmissionsTableView({
  submissions,
}: SubmissionsTableViewProps) {
  // Extract unique field keys from all submissions
  const fieldKeys = useMemo(() => {
    const keys = new Set<string>()
    submissions.forEach((submission) => {
      Object.entries(submission.data).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          keys.add(key)
        }
      })
    })
    return Array.from(keys)
  }, [submissions])

  // Generate columns dynamically based on field keys
  const columns = useMemo<ColumnDef<Submission>[]>(() => {
    const baseColumns: ColumnDef<Submission>[] = [
      {
        accessorKey: 'submissionId',
        header: 'ID',
        cell: ({ row }) => (
          <span className="font-mono text-xs">
            #{row.original.submissionId.slice(0, 8)}
          </span>
        ),
      },
    ]

    const dataColumns: ColumnDef<Submission>[] = fieldKeys.map((key) => ({
      id: key,
      header: () => (
        <span className="capitalize">{key.split('-')[0]}</span>
      ),
      cell: ({ row }) => {
        const value = row.original.data[key]
        if (value === '' || value === null || value === undefined) {
          return <span className="text-muted-foreground">-</span>
        }
        return (
          <span className="max-w-[200px] truncate">
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </span>
        )
      },
    }))

    const dateColumn: ColumnDef<Submission> = {
      accessorKey: 'submittedAt',
      header: 'Submitted',
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDistanceToNow(new Date(row.original.submittedAt), {
            addSuffix: true,
          })}
        </span>
      ),
    }

    return [...baseColumns, ...dataColumns, dateColumn]
  }, [fieldKeys])

  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No submissions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
