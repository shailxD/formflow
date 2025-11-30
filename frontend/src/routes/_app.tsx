import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Save, Share } from 'lucide-react'
import { useState } from 'react'

import { AppSidebar } from '@/components/layout/app-sidebar'
import { ShareFormModal } from '@/components/modals/share-form-modal'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { ProtectedRoute } from '@/components/route-guards'
import useAuthStore from '@/store/auth-store'
import useFormBuilderStore from '@/store/form-builder-store'
import {
  useSaveForm,
  usePublishForm,
} from '@/hooks/mutations/use-form-mutation'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}

function SidebarContent() {
  const { open } = useSidebar()
  const { user } = useAuthStore()
  const location = useLocation()
  const { formDetails, formFields, formId, isSaved } = useFormBuilderStore()
  const saveFormMutation = useSaveForm()
  const publishFormMutation = usePublishForm()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const isFormBuilderRoute = location.pathname.startsWith('/form-builder')
  const hasFormFields = formFields.length > 0
  const showSaveButton = isFormBuilderRoute && hasFormFields
  const showShareButton = isSaved

  const handleSave = () => {
    if (!formDetails || !formId) return
    saveFormMutation.mutate({
      formId,
      formDetails,
      formFields,
    })
  }

  const handlePublish = async () => {
    if (!formDetails || !formId) return
    await publishFormMutation.mutateAsync({
      formId,
      formDetails: {
        ...formDetails,
        isPublished: true,
      },
      formFields,
    })
  }

  return (
    <SidebarInset className="flex h-screen flex-col overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={cn(
              '-ml-1',
              open ? 'cursor-e-resize' : 'cursor-w-resize',
            )}
          />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex gap-1.5">
            <h2 className="italic">Hello,</h2>
            <h2 className="font-semibold italic">
              {user?.username ?? 'Guest'}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {showShareButton && (
            <Button
              variant="secondary"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share className="size-4 shrink-0" />
              Share
            </Button>
          )}
          {showSaveButton && (
            <Button onClick={handleSave} disabled={saveFormMutation.isPending}>
              <Save className="size-4 shrink-0" />
              {saveFormMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          )}
          <ThemeSwitcher />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <Outlet />
      </div>

      <ShareFormModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        formId={formId}
        formSlug={formDetails?.slug}
        isPublished={formDetails?.isPublished ?? false}
        onPublish={handlePublish}
      />
    </SidebarInset>
  )
}
