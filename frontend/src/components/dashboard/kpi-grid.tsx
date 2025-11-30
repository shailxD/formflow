import {
  Calendar,
  FileText,
  FormInput,
  TrendingUp,
  Users,
} from 'lucide-react'

import { KpiCard } from './kpi-card'

interface DashboardStats {
  totalSubmissions: number
  totalForms: number
  totalFormFields: number
  last30DaysSubmissions: number
  avgDailySubmissions: number
}

interface KpiGridProps {
  stats: DashboardStats
}

export function KpiGrid({ stats }: KpiGridProps) {
  const kpis = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      icon: Users,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Total Forms',
      value: stats.totalForms,
      icon: FileText,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Form Fields',
      value: stats.totalFormFields,
      icon: FormInput,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Last 30 Days',
      value: stats.last30DaysSubmissions,
      icon: Calendar,
      iconColor: 'text-orange-600',
      iconBgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      title: 'Avg. Daily Submissions',
      value: stats.avgDailySubmissions,
      icon: TrendingUp,
      iconColor: 'text-emerald-600',
      iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
