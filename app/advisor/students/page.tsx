"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase } from "lucide-react"
import { demoApi, DEMO_USERS } from "@/lib/demo-data"

export default function AdvisorStudentsPage() {
  const { user, isLoading } = useDemoSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "advisor")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const students = DEMO_USERS.filter((u) => u.role === "student")
  const allApplications = demoApi.getApplications()

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Students</h1>
          <p className="text-muted-foreground text-lg">
            View and manage all students in the system
          </p>
        </div>

        {students.length === 0 ? (
          <Card className="p-12 text-center glass">
            <div className="max-w-md mx-auto space-y-4">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">No students yet</h3>
              <p className="text-muted-foreground">No students have registered</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {students.map((student) => {
              const studentApps = allApplications.filter((a) => a.user_id === student.id)
              return (
                <Card key={student.id} className="p-6 glass">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{student.full_name}</h3>
                        <p className="text-muted-foreground">{student.email}</p>
                      </div>

                      {student.profile && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Program:</span>
                            <span className="text-muted-foreground">
                              {student.profile.program} • Year {student.profile.year_of_study}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Major:</span>
                            <span className="text-muted-foreground">{student.profile.major}</span>
                          </div>
                          {student.profile.skills && student.profile.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {student.profile.skills.slice(0, 5).map((skill: string) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="size-4 text-muted-foreground" />
                          <span>{studentApps.length} Applications</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

