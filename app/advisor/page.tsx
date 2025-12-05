"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"
import { demoApi, DEMO_USERS } from "@/lib/demo-data"
import Link from "next/link"

export default function AdvisorDashboard() {
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

  const allApplications = demoApi.getApplications()
  const applicationsForReview = demoApi.getApplicationsForReview()
  const students = DEMO_USERS.filter((u) => u.role === "student")

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    ready_for_review: "bg-primary/10 text-primary",
    needs_revision: "bg-accent/10 text-accent",
    approved: "bg-green-500/10 text-green-500",
    applied: "bg-secondary/10 text-secondary",
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">Advisor Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review and approve student internship applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Students</span>
              <Users className="size-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">{students.length}</div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Needs Review</span>
              <AlertCircle className="size-5 text-accent" />
            </div>
            <div className="text-3xl font-bold">{applicationsForReview.length}</div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Approved</span>
              <CheckCircle className="size-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold">
              {allApplications.filter((a) => a.status === "approved").length}
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Avg. Score</span>
              <TrendingUp className="size-5 text-secondary" />
            </div>
            <div className="text-3xl font-bold">
              {allApplications.length > 0
                ? Math.round(
                    allApplications.reduce((sum, a) => sum + (a.readiness_score || 0), 0) /
                      allApplications.length
                  )
                : 0}
            </div>
          </Card>
        </div>

        {/* Applications Needing Review */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Applications Needing Review</h2>
            <Link href="/advisor/applications">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                View All
              </Badge>
            </Link>
          </div>

          {applicationsForReview.length === 0 ? (
            <Card className="p-12 text-center glass">
              <div className="max-w-md mx-auto space-y-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">All caught up!</h3>
                <p className="text-muted-foreground">No applications need review at this time</p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {applicationsForReview.slice(0, 5).map((app) => {
                const job = demoApi.getJob(app.job_posting_id)
                const student = students.find((s) => s.id === app.user_id)
                if (!job) return null

                return (
                  <Link key={app.id} href={`/advisor/applications/${app.id}`}>
                    <Card className="p-6 glass hover:border-primary/50 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <Badge className={statusColors[app.status]}>
                                {app.status.replace(/_/g, " ")}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">
                              {student?.full_name} • {job.company} • {job.location}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FileText className="size-4 text-muted-foreground" />
                              <span>
                                {app.resume_version_id ? "Resume ready" : "No resume"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="size-4 text-muted-foreground" />
                              <span>
                                {app.cover_letter_version_id ? "Cover letter ready" : "No cover letter"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {app.readiness_score !== null && (
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {app.readiness_score}
                            </div>
                            <div className="text-sm text-muted-foreground">Readiness</div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

