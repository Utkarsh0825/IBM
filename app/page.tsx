import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Target, CheckCircle, Users } from "lucide-react"
import { DEMO_MODE } from "@/lib/demo-data"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="font-bold text-xl">InternPath AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link href="/auth/login">
                Get Started <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm">
            <Sparkles className="size-4" />
            {DEMO_MODE ? "Demo Mode Active - Try It Now!" : "AI-Powered Career Tools"}
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-balance">
            Your AI copilot for{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              landing internships
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            InternPath AI helps students create tailored resumes and cover letters, run quality checks, and get advisor
            feedback—all powered by cutting-edge AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg h-12 px-8"
            >
              <Link href="/auth/login">
                Start Your Application <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-12 px-8 bg-transparent">
              <Link href="#demo">View Demo</Link>
            </Button>
          </div>

          {DEMO_MODE && (
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Quick Demo Login:</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <code className="px-3 py-1.5 bg-card rounded text-sm border">student@demo.local</code>
                <code className="px-3 py-1.5 bg-card rounded text-sm border">advisor@demo.local</code>
                <code className="px-3 py-1.5 bg-card rounded text-sm border">admin@demo.local</code>
                <span className="text-sm text-muted-foreground">| Password: demo123</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground">Powered by AI, guided by experts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "AI-Tailored Resumes",
                description:
                  "Automatically customize your resume for each job posting, highlighting relevant skills and experience.",
              },
              {
                icon: Sparkles,
                title: "Smart Cover Letters",
                description:
                  "Generate compelling cover letters that match the job requirements and showcase your unique strengths.",
              },
              {
                icon: CheckCircle,
                title: "Quality Checks",
                description: "Run automated checks for grammar, consistency, and professionalism before submission.",
              },
              {
                icon: Users,
                title: "Advisor Review",
                description: "Get feedback from career advisors who can approve and improve your applications.",
              },
              {
                icon: Target,
                title: "Skill Gap Analysis",
                description:
                  "Understand how your profile matches job requirements and get suggestions for improvement.",
              },
              {
                icon: CheckCircle,
                title: "Application Tracking",
                description: "Keep track of all your applications, versions, and feedback in one organized place.",
              },
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:border-primary/50 transition-all group">
                <feature.icon className="size-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">How it works</h2>
            <p className="text-xl text-muted-foreground">Four simple steps to your dream internship</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Create Your Profile",
                description: "Upload your base resume and fill in your skills, experience, and preferences.",
              },
              {
                step: 2,
                title: "Import Job Postings",
                description: "Paste job descriptions and let AI extract key requirements and skills.",
              },
              {
                step: 3,
                title: "Generate Tailored Documents",
                description: "AI creates customized resumes and cover letters for each application.",
              },
              {
                step: 4,
                title: "Review & Submit",
                description: "Run quality checks, get advisor feedback, and submit with confidence.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 size-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8 glass p-12 rounded-3xl">
          <h2 className="text-4xl font-bold">Ready to land your dream internship?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of students using AI to create better applications faster.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg h-14 px-10"
          >
            <Link href="/auth/login">
              Get Started Free <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
          {DEMO_MODE && (
            <p className="text-sm text-muted-foreground pt-4">
              💡 Running in offline demo mode. Perfect for presentations and testing.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="font-semibold">InternPath AI</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 InternPath AI. Built for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
