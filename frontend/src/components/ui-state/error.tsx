import { RotateCcw, TriangleAlert } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <TriangleAlert className="size-32 text-destructive/50" strokeWidth={1} />
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="max-w-md text-wrap wrap-break-word text-muted-foreground">
        {error.message || 'Something went wrong'}
      </p>
      <Button
        variant="default"
        onClick={() => {
          if (reset) {
            reset()
          } else {
            router.invalidate()
          }
        }}
      >
        Try Again
        <RotateCcw className="ml-2 size-4" />
      </Button>
    </div>
  )
}
