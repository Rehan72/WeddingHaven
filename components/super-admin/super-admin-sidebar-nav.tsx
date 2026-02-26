"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  CreditCard,
  Settings,
  BarChart3,
  LogOut,
  ShieldAlert,
  Globe,
  Database,
  FileText,
  Lock,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function SuperAdminSidebarNav() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/super-admin",
      icon: LayoutDashboard,
    },
    {
      title: "Admins",
      href: "/super-admin/admins",
      icon: ShieldAlert,
    },
    {
      title: "Users",
      href: "/super-admin/users",
      icon: Users,
    },
    {
      title: "Halls",
      href: "/super-admin/halls",
      icon: Building2,
    },
    {
      title: "Bookings",
      href: "/super-admin/bookings",
      icon: Calendar,
    },
    {
      title: "Payments",
      href: "/super-admin/payments",
      icon: CreditCard,
    },
    {
      title: "Reports",
      href: "/super-admin/reports",
      icon: BarChart3,
    },
    {
      title: "Locations",
      href: "/super-admin/locations",
      icon: Globe,
    },
    {
      title: "Database",
      href: "/super-admin/database",
      icon: Database,
    },
    {
      title: "Logs",
      href: "/super-admin/logs",
      icon: FileText,
    },
    {
      title: "Permissions",
      href: "/super-admin/permissions",
      icon: Lock,
    },
    {
      title: "Settings",
      href: "/super-admin/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link href="/super-admin" className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2 font-bold text-xl py-4">
            <span className="text-primary">Super</span>
            <span className="text-accent">Admin</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/sign-in">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
