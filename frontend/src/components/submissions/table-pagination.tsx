import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type TablePaginationProps = {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function TablePagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={cn(
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer',
                'text-xs sm:text-sm',
              )}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page} className="hidden sm:block">
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* Show current page on mobile */}
          <PaginationItem className="sm:hidden">
            <PaginationLink isActive className="cursor-default">
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              className={cn(
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer',
                'text-xs sm:text-sm',
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p className="text-xs text-muted-foreground sm:min-w-fit sm:text-sm">
        <span className="hidden sm:inline">
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{' '}
          {totalItems} submissions
        </span>
        <span className="sm:hidden">
          {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
        </span>
      </p>
    </div>
  )
}
