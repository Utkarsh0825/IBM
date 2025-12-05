"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useDemoSession } from "@/lib/hooks/use-demo-session"
import { DEMO_MODE } from "@/lib/demo-data"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  LogOut,
  Sparkles,
  Users,
  Shield,
  Menu,
  X,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useDemoSession()
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const navigation =
    user?.role === "student"
      ? [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Applications", href: "/applications", icon: FileText },
          { name: "Browse Jobs", href: "/jobs", icon: Briefcase },
          { name: "Profile", href: "/dashboard/profile", icon: User },
        ]
      : user?.role === "advisor"
        ? [
            { name: "Dashboard", href: "/advisor", icon: LayoutDashboard },
            { name: "Review Applications", href: "/advisor/applications", icon: FileText },
            { name: "Students", href: "/advisor/students", icon: Users },
          ]
        : [
            { name: "Dashboard", href: "/admin", icon: Shield },
            { name: "Users", href: "/admin/users", icon: Users },
            { name: "Settings", href: "/admin/settings", icon: User },
          ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo Mode Banner */}
      {DEMO_MODE && (
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-primary/30 px-4 py-2">
          <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
            <AlertCircle className="size-4" />
            <span>
              <strong>Demo Mode:</strong> All data is local and fake. No real accounts or external services are used.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-border/50 glass sticky top-0 h-screen">
          <div className="p-6 border-b border-border/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="size-5 text-white" />
              </div>
              <span className="font-bold text-lg">InternPath AI</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="size-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border/50 space-y-2">
            <div className="px-3 py-2 text-sm">
              <div className="font-medium">{user?.full_name}</div>
              <div className="text-muted-foreground capitalize">{user?.role}</div>
            </div>
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border/50 glass">
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="size-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">InternPath AI</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="size-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="size-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 space-y-2">
                <div className="px-3 py-2 text-sm">
                  <div className="font-medium">{user?.full_name}</div>
                  <div className="text-muted-foreground capitalize">{user?.role}</div>
                </div>
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="lg:hidden border-b border-border/50 p-4 glass sticky top-0 z-40">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="size-5" />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="size-4 text-white" />
                </div>
                <span className="font-bold">InternPath AI</span>
              </Link>
              <div className="w-10" />
            </div>
          </div>

          <div className="container mx-auto p-6 lg:p-8 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
