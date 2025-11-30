import { Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme-provider'

const themes = [
  {
    key: 'system',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
] as const

export type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className,
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 cursor-pointer rounded-full"
            key={key}
            onClick={() => setTheme(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
