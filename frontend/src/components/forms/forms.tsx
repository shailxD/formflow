import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import {
  Ellipsis,
  Eye,
  Pencil,
  Plus,
  Search,
  Share2,
  Trash2,
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { useForms } from '@/hooks/queries/use-forms'
import useFormBuilderStore from '@/store/form-builder-store'
import { Button } from '../ui/button'

function EmptyState() {
  const navigate = useNavigate()
  const { clearFormDetails } = useFormBuilderStore()

  const handleCreateForm = () => {
    clearFormDetails()
    const formId = uuidv4()
    navigate({ to: `/form-builder/${formId}` })
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <button
        onClick={handleCreateForm}
        className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-muted transition-colors hover:bg-muted/80"
      >
        <Plus className="size-8 text-muted-foreground" />
      </button>
      <h3 className="mb-2 text-lg font-semibold">No forms yet</h3>
      <p className="text-sm text-muted-foreground">
        Get started by creating your first form. It's quick and easy!
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner className="size-6" />
    </div>
  )
}

interface FormCardProps {
  formId: string
  title: string
  description: string | null
  updatedAt: string
  slug: string
  isPublished?: boolean
}

function FormCard({
  formId,
  title,
  description,
  updatedAt,
  slug,
  isPublished,
}: FormCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ to: `/form/${formId}` })
  }

  const handleViewForm = () => {
    const url = `/f/${slug || formId}`
    window.open(url, '_blank')
  }

  // TODO: Implement these handlers for dropdown menu options
  // const handleEditForm = () => {}
  // const handleShareForm = () => {}
  // const handleDeleteForm = () => {}

  return (
    <button
      onClick={handleClick}
      className="flex h-32 cursor-pointer flex-col justify-between rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="leading-tight font-medium">{title}</h3>
          {description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="rounded p-1 hover:bg-muted"
          >
            <Button variant="outline" size="icon">
              <Ellipsis className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={handleViewForm}>
              <Eye className="size-4" />
              View Form
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Pencil className="size-4" />
              Edit Form
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Share2 className="size-4" />
              Share Form
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              Delete Form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Updated{' '}
          {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        </p>

        {isPublished ? (
          <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Published
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            Draft
          </span>
        )}
      </div>
    </button>
  )
}

export function Forms() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading } = useForms()

  const forms = data?.data ?? []
  const filteredForms = forms.filter((form) =>
    form.formDetails.internalTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search aria-hidden="true" className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search forms"
          autoComplete="off"
          name="form-search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSearchTerm('')
              e.currentTarget.blur()
            }
          }}
          placeholder="Search forms..."
          type="search"
          value={searchTerm}
        />
      </InputGroup>

      {isLoading ? (
        <LoadingState />
      ) : forms.length === 0 ? (
        <EmptyState />
      ) : filteredForms.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No forms found matching "{searchTerm}"
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredForms.map((form) => (
            <FormCard
              key={form.formId}
              formId={form.formId}
              title={form.formDetails.internalTitle}
              description={form.formDetails.description}
              slug={form.formDetails.slug}
              updatedAt={form.updatedAt}
              isPublished={form.formDetails.isPublished}
            />
          ))}
        </div>
      )}
    </div>
  )
}
