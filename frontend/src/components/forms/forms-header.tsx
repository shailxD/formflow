import { useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import useFormBuilderStore from '@/store/form-builder-store'

export function FormsHeader() {
  const navigate = useNavigate()
  const { clearFormDetails } = useFormBuilderStore()

  const handleClick = () => {
    clearFormDetails()
    const formId = uuidv4()
    navigate({ to: `/form-builder/${formId}` })
  }

  return (
    <header className="flex items-center justify-between gap-2">
      <PageHeader
        title="Your Forms"
        description="Create and manage your forms with ease"
      />
      <Button onClick={handleClick} className="w-full sm:w-auto">
        <Plus className="size-4" />
        Create New Form
      </Button>
    </header>
  )
}
