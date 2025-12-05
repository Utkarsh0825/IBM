"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowLeft, User, Briefcase, Shield } from "lucide-react"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DEMO_MODE, DEMO_USERS } from "@/lib/demo-data"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useDemoSession()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = login(email, password)

    if (user) {
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.full_name}`,
      })

      // Redirect based on role
      switch (user.role) {
        case "student":
          router.push("/dashboard")
          break
        case "advisor":
          router.push("/advisor")
          break
        case "admin":
          router.push("/admin")
          break
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const quickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
    // Trigger form submission after a brief moment
    setTimeout(() => {
      const form = document.querySelector("form") as HTMLFormElement
      form?.requestSubmit()
    }, 100)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="flex justify-center">
            <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="size-6 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your InternPath AI account</p>

          {DEMO_MODE && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
              <Sparkles className="size-3" />
              Demo Mode Active
            </div>
          )}
        </div>

        <Card className="glass p-6 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@demo.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="demo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {DEMO_MODE && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Quick Demo Login</span>
                </div>
              </div>

              <div className="space-y-2">
                {DEMO_USERS.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    className="w-full justify-start gap-3 bg-transparent"
                    onClick={() => quickLogin(user.email, user.password)}
                    disabled={isLoading}
                  >
                    {user.role === "student" && <User className="size-4 text-primary" />}
                    {user.role === "advisor" && <Briefcase className="size-4 text-secondary" />}
                    {user.role === "admin" && <Shield className="size-4 text-accent" />}
                    <span className="flex-1 text-left">
                      Login as Demo {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
