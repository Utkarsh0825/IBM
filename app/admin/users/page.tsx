"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { DEMO_USERS } from "@/lib/demo-data"

export default function AdminUsersPage() {
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
          <h1 className="text-4xl font-bold mb-2">Users</h1>
          <p className="text-muted-foreground text-lg">
            Manage all users in the platform
          </p>
        </div>

        <div className="grid gap-4">
          {DEMO_USERS.map((u) => (
            <Card key={u.id} className="p-6 glass">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{u.full_name}</h3>
                    <p className="text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {u.role}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

