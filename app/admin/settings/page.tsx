"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function AdminSettingsPage() {
  const { user, isLoading } = useDemoSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Configure platform settings and preferences
          </p>
        </div>

        <Card className="p-6 glass">
          <div className="flex items-center gap-4 mb-4">
            <Settings className="size-6 text-primary" />
            <h2 className="text-2xl font-semibold">Platform Settings</h2>
          </div>
          <p className="text-muted-foreground">
            Platform configuration and settings will be available here.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}

