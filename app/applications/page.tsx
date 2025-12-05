"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, Plus, TrendingUp } from "lucide-react"
import { demoApi } from "@/lib/demo-data"
import Link from "next/link"

export default function ApplicationsPage() {
  const { user, isLoading } = useDemoSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const applications = demoApi.getApplications(user.id)

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Applications</h1>
            <p className="text-muted-foreground text-lg">
              Track and manage all your internship applications
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Link href="/jobs">
              <Plus className="size-4 mr-2" />
              New Application
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total</span>
              <Briefcase className="size-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">{applications.length}</div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">In Review</span>
              <FileText className="size-5 text-accent" />
            </div>
            <div className="text-3xl font-bold">
              {applications.filter((a) => a.status === "ready_for_review").length}
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Approved</span>
              <FileText className="size-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold">
              {applications.filter((a) => a.status === "approved").length}
            </div>
          </Card>

          <Card className="p-6 glass">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Avg. Score</span>
              <TrendingUp className="size-5 text-secondary" />
            </div>
            <div className="text-3xl font-bold">
              {applications.length > 0
                ? Math.round(
                    applications.reduce((sum, a) => sum + (a.readiness_score || 0), 0) / applications.length
                  )
                : 0}
            </div>
          </Card>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Card className="p-12 text-center glass">
            <div className="max-w-md mx-auto space-y-4">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Briefcase className="size-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">No applications yet</h3>
              <p className="text-muted-foreground">
                Start your internship search by browsing available positions
              </p>
              <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => {
              const job = demoApi.getJob(app.job_posting_id)
              if (!job) return null

              return (
                <Link key={app.id} href={`/applications/${app.id}`}>
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
                            {job.company} • {job.location}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-muted-foreground" />
                            <span>{app.resume_version_id ? "Resume ready" : "No resume"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-muted-foreground" />
                            <span>
                              {app.cover_letter_version_id ? "Cover letter ready" : "No cover letter"}
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            {new Date(app.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {app.readiness_score !== null && (
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary mb-1">{app.readiness_score}</div>
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
    </DashboardLayout>
  )
}

