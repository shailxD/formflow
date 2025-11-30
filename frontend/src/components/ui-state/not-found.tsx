import { ArrowRightIcon, GalleryVerticalEnd } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <GalleryVerticalEnd
        strokeWidth={1}
        className="size-32 text-muted-foreground"
      />

      <h1 className="mt-8 mb-6 font-mono text-8xl font-medium">404</h1>

      <Button variant="default" asChild>
        <Link to="/">
          Go Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  )
}
