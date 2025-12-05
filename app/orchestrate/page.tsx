import { WatsonOrchestrateEmbed } from "@/components/orchestrate/WatsonOrchestrateEmbed"
import { Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "IBM AI Career Agent - InternPath AI",
  description: "Chat with IBM Watson Orchestrate AI agent for personalized resume and cover letter assistance",
}

export default function OrchestratePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - Always Accessible */}
      <header className="border-b border-border/30 backdrop-blur-sm sticky top-0 z-[100] bg-background/95">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="size-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="font-semibold text-lg">InternPath AI</span>
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="size-4" />
              <span className="text-sm font-medium">AI Career Agent</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild size="sm" className="h-8 text-xs">
              <Link href="/">
                <ArrowLeft className="size-3 mr-1.5" />
                Home
              </Link>
            </Button>
            <Button variant="outline" asChild size="sm" className="h-8 text-xs">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Centered Chat Container - ChatGPT Style */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-hidden relative bg-background">
        {/* Centered Chat Box */}
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col px-4 py-6">
          <WatsonOrchestrateEmbed />
        </div>
      </main>
    </div>
  )
}

