"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Sparkles } from "lucide-react"
import { demoApi, DEMO_JOBS } from "@/lib/demo-data"
import Link from "next/link"

function NewApplicationContent() {
  const { user, isLoading } = useDemoSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("job")
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (jobId && user && !isCreating) {
      handleCreateApplication()
    }
  }, [jobId, user])

  const handleCreateApplication = async () => {
    if (!jobId || !user) return

    setIsCreating(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newApp = demoApi.createApplicationFromJob(user.id, jobId)
      router.push(`/applications/${newApp.id}`)
    } catch (error) {
      console.error("Failed to create application:", error)
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const job = jobId ? DEMO_JOBS.find((j) => j.id === jobId) : null

  if (!jobId || !job) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Button variant="ghost" asChild>
            <Link href="/jobs">
              <ArrowLeft className="size-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
          <Card className="p-12 text-center glass">
            <h2 className="text-2xl font-bold mb-2">Job not found</h2>
            <p className="text-muted-foreground mb-4">Please select a job to start an application</p>
            <Button asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <Button variant="ghost" asChild>
          <Link href="/jobs">
            <ArrowLeft className="size-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        {isCreating ? (
          <Card className="p-12 text-center glass">
            <Loader2 className="size-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Creating Application...</h2>
            <p className="text-muted-foreground">Setting up your application for {job.title}</p>
          </Card>
        ) : (
          <Card className="p-6 glass">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Start New Application</h1>
                <p className="text-muted-foreground">Review the job details and create your application</p>
              </div>

              <div className="border-t border-border/50 pt-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {job.company} • {job.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.parsed_json.required_skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.parsed_json.responsibilities.map((resp: string, i: number) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCreateApplication}
                    disabled={isCreating}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    {isCreating ? (
                      <Loader2 className="size-4 animate-spin mr-2" />
                    ) : (
                      <Sparkles className="size-4 mr-2" />
                    )}
                    Create Application
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/jobs">Cancel</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function NewApplicationPage() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    }>
      <NewApplicationContent />
    </Suspense>
  )
}

