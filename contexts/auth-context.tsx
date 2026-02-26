"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import api, { type User } from "@/services/api"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const userData = await api.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const data = await api.login({ email, password })
      setUser(data.user)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })

      // Redirect based on role
      if (data.user.role === "hall-owner") {
        router.push("/hall-owner")
      } else if (data.user.role === "admin") {
        router.push("/admin")
      } else if (data.user.role === "super-admin") {
        router.push("/super-admin")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    try {
      setLoading(true)
      const data = await api.register(userData)
      setUser(data.user)
      toast({
        title: "Success",
        description: "Registered successfully",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/sign-in")
    toast({
      title: "Success",
      description: "Logged out successfully",
    })
  }

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in")
      setLoading(true)
      const data = await api.updateUser(user.id, userData)
      setUser({ ...user, ...data.user })
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error("Update failed:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
