"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

interface UserNavProps {
  role?: string
}

export function UserNav({ role = "User" }: UserNavProps) {
  const getInitials = () => {
    if (role === "Admin") return "AD"
    if (role === "Hall Owner") return "HO"
    if (role === "Super Admin") return "SA"
    return "RA"
  }

  const getName = () => {
    if (role === "Admin") return "Admin User"
    if (role === "Hall Owner") return "Hall Owner"
    if (role === "Super Admin") return "Super Admin"
    return "Rahul Agarwal"
  }

  const getEmail = () => {
    if (role === "Admin") return "admin@example.com"
    if (role === "Hall Owner") return "hallowner@example.com"
    if (role === "Super Admin") return "superadmin@example.com"
    return "rahul.agarwal@example.com"
  }

  const getDashboardLink = () => {
    if (role === "Admin") return "/admin"
    if (role === "Hall Owner") return "/hall-owner"
    if (role === "Super Admin") return "/super-admin"
    return "/dashboard"
  }

  const getProfileLink = () => {
    if (role === "Admin") return "/admin/profile"
    if (role === "Hall Owner") return "/hall-owner/profile"
    if (role === "Super Admin") return "/super-admin/profile"
    return "/dashboard/profile"
  }

  const getSettingsLink = () => {
    if (role === "Admin") return "/admin/settings"
    if (role === "Hall Owner") return "/hall-owner/settings"
    if (role === "Super Admin") return "/super-admin/settings"
    return "/dashboard/settings"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getName()}</p>
            <p className="text-xs leading-none text-muted-foreground">{getEmail()}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={getDashboardLink()}>
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={getProfileLink()}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={getSettingsLink()}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign-in">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
