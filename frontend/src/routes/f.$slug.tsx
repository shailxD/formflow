import { Suspense, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { FormSkeleton, PublicForm } from '@/components/f'
import { NotFound } from '@/components/ui-state'
import { useSuspenseFormBySlug } from '@/hooks/queries/use-forms'
import usePublicFormStore from '@/store/public-form-store'

export const Route = createFileRoute('/f/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()

  return (
    <Suspense fallback={<FormSkeleton />}>
      <PublicFormContent slug={slug} />
    </Suspense>
  )
}

function PublicFormContent({ slug }: { slug: string }) {
  const { data } = useSuspenseFormBySlug(slug)
  const { setForm, clearForm } = usePublicFormStore()

  useEffect(() => {
    if (data?.data) {
      setForm(data.data)
    }
    return () => {
      clearForm()
    }
  }, [data, setForm, clearForm])

  if (!data?.data) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-8">
      <PublicForm form={data.data} slug={slug} />
    </div>
  )
}
