"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, CheckCircle, AlertCircle, MessageSquare, ArrowLeft, Send } from "lucide-react"
import { demoApi, DEMO_USERS } from "@/lib/demo-data"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AdvisorApplicationReviewPage() {
  const params = useParams()
  const id = params.id as string
  const { user, isLoading } = useDemoSession()
  const router = useRouter()
  const { toast } = useToast()
  const [application, setApplication] = useState<any>(null)
  const [job, setJob] = useState<any>(null)
  const [student, setStudent] = useState<any>(null)
  const [resume, setResume] = useState<any>(null)
  const [coverLetter, setCoverLetter] = useState<any>(null)
  const [qualityCheck, setQualityCheck] = useState<any>(null)
  const [feedback, setFeedback] = useState<any[]>([])
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "advisor")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (id) {
      const app = demoApi.getApplication(id)
      setApplication(app)
      if (app) {
        setJob(demoApi.getJob(app.job_posting_id))
        const studentUser = DEMO_USERS.find((s) => s.id === app.user_id)
        setStudent(studentUser)
        if (app.resume_version_id) {
          const res = demoApi.getResume(app.resume_version_id)
          setResume(res)
          if (res) {
            setFeedback(demoApi.getFeedback(res.id))
          }
        }
        if (app.cover_letter_version_id) {
          setCoverLetter(demoApi.getCoverLetter(app.cover_letter_version_id))
        }
        setQualityCheck(demoApi.getQualityCheck(app.id))
      }
    }
  }, [id])

  if (isLoading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!application || !job || !student) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Application not found</h2>
          <Button onClick={() => router.push("/advisor")}>Back to Dashboard</Button>
        </div>
      </DashboardLayout>
    )
  }

  const handleSubmitFeedback = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide feedback before submitting",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would save to database
      toast({
        title: "Feedback Submitted!",
        description: "Your feedback has been sent to the student",
      })
      setComment("")
      // Refresh feedback list
      if (resume) {
        setFeedback([...feedback, { id: Date.now(), comment_text: comment, created_at: new Date().toISOString() }])
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApprove = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would update application status
      toast({
        title: "Application Approved!",
        description: "The student has been notified",
      })
      router.push("/advisor/applications")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRequestRevision = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would update application status
      toast({
        title: "Revision Requested",
        description: "The student has been notified to make changes",
      })
      router.push("/advisor/applications")
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    ready_for_review: "bg-primary/10 text-primary",
    needs_revision: "bg-accent/10 text-accent",
    approved: "bg-green-500/10 text-green-500",
    applied: "bg-secondary/10 text-secondary",
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <Button variant="ghost" asChild>
          <Link href="/advisor/applications">
            <ArrowLeft className="size-4 mr-2" />
            Back to Applications
          </Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
              <Badge className={statusColors[application.status]}>
                {application.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg">
              {student.full_name} • {job.company} • {job.location}
            </p>
          </div>

          {application.readiness_score !== null && (
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                {application.readiness_score}
              </div>
              <div className="text-sm text-muted-foreground">Readiness Score</div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass flex-wrap h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            <TabsTrigger value="quality">Quality Check</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-4 sm:p-6 glass">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Job Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.parsed_json.required_skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm sm:text-base">
                    {job.parsed_json.responsibilities.map((resp: string, i: number) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 glass">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Application Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {resume ? (
                      <CheckCircle className="size-5 text-green-500" />
                    ) : (
                      <AlertCircle className="size-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">Tailored Resume</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {coverLetter ? (
                      <CheckCircle className="size-5 text-green-500" />
                    ) : (
                      <AlertCircle className="size-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">Cover Letter</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {qualityCheck ? (
                      <CheckCircle className="size-5 text-green-500" />
                    ) : (
                      <AlertCircle className="size-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">Quality Check</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-4 sm:p-6 glass border-primary/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Review Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="size-4 mr-2" />
                  Approve Application
                </Button>
                <Button
                  onClick={handleRequestRevision}
                  disabled={isSubmitting}
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  <AlertCircle className="size-4 mr-2" />
                  Request Revision
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            {resume ? (
              <Card className="p-4 sm:p-6 glass">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold">{resume.title}</h3>
                  <Badge>{resume.source}</Badge>
                </div>
                <div className="space-y-6">
                  {resume.structured_json.education?.map((edu: any, i: number) => (
                    <div key={i}>
                      <h4 className="font-semibold">{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.dates}</p>
                    </div>
                  ))}

                  {resume.structured_json.experience?.map((exp: any, i: number) => (
                    <div key={i}>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-muted-foreground">
                        {exp.company} • {exp.dates}
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {exp.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="text-sm">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {resume.structured_json.projects?.map((proj: any, i: number) => (
                    <div key={i}>
                      <h4 className="font-semibold">{proj.name}</h4>
                      <p className="text-sm text-muted-foreground">{proj.dates}</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {proj.bullets.map((bullet: string, j: number) => (
                          <li key={j} className="text-sm">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-8 sm:p-12 text-center glass">
                <FileText className="size-12 sm:size-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold">No Resume Generated</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  The student hasn't generated a tailored resume yet
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cover-letter" className="space-y-6">
            {coverLetter ? (
              <Card className="p-4 sm:p-6 glass">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">{coverLetter.title}</h3>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{coverLetter.raw_text}</div>
              </Card>
            ) : (
              <Card className="p-8 sm:p-12 text-center glass">
                <FileText className="size-12 sm:size-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold">No Cover Letter Generated</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  The student hasn't generated a cover letter yet
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            {qualityCheck ? (
              <Card className="p-4 sm:p-6 glass">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold">Quality Assessment</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {application.readiness_score}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">{qualityCheck.summary}</p>

                <div className="space-y-4">
                  {qualityCheck.checklist_json.passed?.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                      <CheckCircle className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{item.item}</span>
                    </div>
                  ))}

                  {qualityCheck.checklist_json.warnings?.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
                      <AlertCircle className="size-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{item.item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-8 sm:p-12 text-center glass">
                <CheckCircle className="size-12 sm:size-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold">Quality Check Not Run</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  The student hasn't run a quality check yet
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="p-4 sm:p-6 glass">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="size-5 text-secondary" />
                Provide Feedback
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="comment">Your Feedback</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide constructive feedback for the student..."
                    rows={6}
                    className="mt-2"
                  />
                </div>
                <Button
                  onClick={handleSubmitFeedback}
                  disabled={isSubmitting || !comment.trim()}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="size-4 mr-2 animate-pulse" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="size-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {feedback.length > 0 && (
              <Card className="p-4 sm:p-6 glass border-secondary/50">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Previous Feedback</h3>
                <div className="space-y-4">
                  {feedback.map((fb) => (
                    <div key={fb.id} className="bg-secondary/10 p-4 rounded-lg">
                      <p className="text-sm sm:text-base">{fb.comment_text}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(fb.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

