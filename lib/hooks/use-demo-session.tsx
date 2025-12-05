"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { demoAuth, type DemoUser, DEMO_MODE } from "@/lib/demo-data"

interface DemoSessionContextType {
  user: DemoUser | null
  login: (email: string, password: string) => DemoUser | null
  logout: () => void
  isLoading: boolean
}

const DemoSessionContext = createContext<DemoSessionContextType | undefined>(undefined)

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    if (DEMO_MODE) {
      const currentUser = demoAuth.getCurrentUser()
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    const user = demoAuth.login(email, password)
    setUser(user)
    return user
  }

  const logout = () => {
    demoAuth.logout()
    setUser(null)
  }

  return (
    <DemoSessionContext.Provider value={{ user, login, logout, isLoading }}>{children}</DemoSessionContext.Provider>
  )
}

export function useDemoSession() {
  const context = useContext(DemoSessionContext)
  if (context === undefined) {
    throw new Error("useDemoSession must be used within DemoSessionProvider")
  }
  return context
}
