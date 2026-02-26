import type React from "react"
import { UnifiedSidebarNav } from "@/components/unified-sidebar-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { Separator } from "@/components/ui/separator"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static md:hidden">
          <MobileNav />
          <div className="flex flex-1 items-center justify-end gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/dashboard/notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <UserNav />
          </div>
        </header>

        <div className="grid flex-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <UnifiedSidebarNav role="user" />
          <div className="flex flex-col">
            {/* Desktop header */}
            <header className="sticky top-0 z-30 hidden h-14 items-center gap-4 border-b bg-background px-6 md:flex">
              <div className="flex flex-1 items-center justify-end gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link href="/dashboard/notifications">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
                    <span className="sr-only">Notifications</span>
                  </Link>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <UserNav />
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
