"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Shield, Users, Settings } from "lucide-react"
import { DEMO_USERS, demoApi } from "@/lib/demo-data"

export default function AdminDashboard() {
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

  const allUsers = DEMO_USERS
  const allApplications = demoApi.getApplications()

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage the InternPath AI platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Users</span>
              <Users className="size-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">{allUsers.length}</div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Applications</span>
              <Shield className="size-5 text-secondary" />
            </div>
            <div className="text-3xl font-bold">{allApplications.length}</div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Platform Status</span>
              <Settings className="size-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-500">Active</div>
          </Card>
        </div>

        <Card className="p-6 glass">
          <h2 className="text-2xl font-semibold mb-4">Platform Overview</h2>
          <p className="text-muted-foreground">
            Admin features and platform management tools will be available here.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}

