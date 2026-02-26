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
  Heart,
  User,
  ImageIcon,
  MessageSquare,
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

type UserRole = "user" | "hall-owner" | "admin" | "super-admin"

interface UnifiedSidebarNavProps {
  role: UserRole
}

export function UnifiedSidebarNav({ role = "user" }: UnifiedSidebarNavProps) {
  const pathname = usePathname()

  // Define routes for each role
  const userRoutes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
    },
    {
      title: "All Halls",
      href: "/dashboard/halls",
      icon: Building2,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: Heart,
    },
    {
      title: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const hallOwnerRoutes = [
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

  const adminRoutes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Halls",
      href: "/admin/halls",
      icon: Building2,
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const superAdminRoutes = [
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

  // Select routes based on role
  const routes = (() => {
    switch (role) {
      case "hall-owner":
        return hallOwnerRoutes
      case "admin":
        return adminRoutes
      case "super-admin":
        return superAdminRoutes
      default:
        return userRoutes
    }
  })()

  // Get title based on role
  const getTitle = () => {
    switch (role) {
      case "hall-owner":
        return (
          <>
            <span className="text-primary">Owner</span>
            <span className="text-accent">Panel</span>
          </>
        )
      case "admin":
        return (
          <>
            <span className="text-primary">Admin</span>
            <span className="text-accent">Panel</span>
          </>
        )
      case "super-admin":
        return (
          <>
            <span className="text-primary">Super</span>
            <span className="text-accent">Admin</span>
          </>
        )
      default:
        return (
          <>
            <span className="text-primary">Wedding</span>
            <span className="text-accent">Haven</span>
          </>
        )
    }
  }

  // Get base path for the role
  const getBasePath = () => {
    switch (role) {
      case "hall-owner":
        return "/hall-owner"
      case "admin":
        return "/admin"
      case "super-admin":
        return "/super-admin"
      default:
        return "/dashboard"
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link href={getBasePath()} className="flex items-center gap-2 px-2">
          <div className="flex items-center gap-2 font-bold text-xl py-4">{getTitle()}</div>
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
