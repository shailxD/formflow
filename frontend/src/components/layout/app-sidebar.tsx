'use client'

import * as React from 'react'
import { GalleryVerticalEnd, LayoutDashboard, ReceiptText } from 'lucide-react'

import { NavMain } from '@/components/layout/nav-main'
import { NavUser } from '@/components/layout/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { APP } from '@/data/app'
import { Link } from '@tanstack/react-router'

const data = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Forms',
    url: '/forms',
    icon: ReceiptText,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                to="/dashboard"
                className="flex cursor-default items-center gap-2 self-center font-medium"
              >
                <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground dark:text-white">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                {APP.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
