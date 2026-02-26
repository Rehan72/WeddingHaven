"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  CreditCard,
  Settings,
  BarChart3,
  LogOut,
  ImageIcon,
  MessageSquare,
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

export function OwnerSidebarNav() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      href: "/hall-owner",
      icon: LayoutDashboard,
    },
    {
      title: "My Halls",
      href: "/hall-owner/halls",
      icon: Building2,
    },
    {
      title: "Bookings",
      href: "/hall-owner/bookings",
      icon: Calendar,
    },
    {
      title: "Gallery",
      href: "/hall-owner/gallery",
      icon: ImageIcon,
    },
    {
      title: "Messages",
      href: "/hall-owner/messages",
      icon: MessageSquare,
    },
    {
      title: "Payments",
      href: "/hall-owner/payments",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/hall-owner/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/hall-owner/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link href="/hall-owner" className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2 font-bold text-xl py-4">
            <span className="text-primary">Owner</span>
            <span className="text-accent">Panel</span>
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
