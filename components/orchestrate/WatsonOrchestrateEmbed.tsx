"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function WatsonOrchestrateEmbed() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const scriptLoadedRef = useRef(false)
  const initCalledRef = useRef(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Prevent duplicate initialization
    if (scriptLoadedRef.current || initCalledRef.current) return

    // Suppress console errors from Watson Orchestrate
    const originalError = console.error
    const originalWarn = console.warn
    
    const suppressWatsonErrors = (...args: any[]) => {
      const message = args[0]?.toString() || ""
      // Suppress known Watson Orchestrate errors that we handle
      if (
        message.includes("authTokenNeeded") ||
        message.includes("display_name") ||
        message.includes("401") ||
        message.includes("Wx0Chat") ||
        message.includes("Failed to fetch agent details") ||
        message.includes("Cannot read properties of null") ||
        message.includes("AxiosError") ||
        message.includes("Request failed with status code 401")
      ) {
        return // Suppress these errors
      }
      originalError.apply(console, args)
    }

    const suppressWatsonWarnings = (...args: any[]) => {
      const message = args[0]?.toString() || ""
      // Suppress known warnings
      if (
        message.includes("ProseMirror") ||
        message.includes("white-space")
      ) {
        return
      }
      originalWarn.apply(console, args)
    }

    console.error = suppressWatsonErrors
    console.warn = suppressWatsonWarnings

    try {
      // Set Watson Orchestrate configuration exactly as provided
      window.wxOConfiguration = {
        orchestrationID: "2d036da4e6924f42b26c13056cf322b4_539cd33a-6108-4a44-8ec6-ba807623a916",
        hostURL: "https://us-south.watson-orchestrate.cloud.ibm.com",
        rootElementID: "root",
        deploymentPlatform: "ibmcloud",
        crn: "crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/2d036da4e6924f42b26c13056cf322b4:539cd33a-6108-4a44-8ec6-ba807623a916::",
        chatOptions: {
          agentId: "17dd8177-09e1-4ab7-bc74-4498d276e38d",
        },
      }

      // Handle authTokenNeeded event - set up listener before script loads
      const handleAuthTokenNeeded = (event: any) => {
        // For deployed public agents, try to handle auth gracefully
        if (event && typeof event === "object") {
          // Try to set authToken property if it exists
          try {
            if (event.authToken !== undefined) {
              // If public access is allowed, null token might work
              event.authToken = null
            }
            // Some versions use a setter
            if (typeof event.setAuthToken === "function") {
              event.setAuthToken("")
            }
          } catch (e) {
            // Ignore errors - agent may work without explicit token
          }
        }
      }

      // Set up global handler for auth events
      window.wxOAuthTokenNeeded = handleAuthTokenNeeded

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="wxoLoader.js"]'
      )
      if (existingScript) {
        // Script already loaded, just initialize
        if (window.wxoLoader && !initCalledRef.current) {
          try {
            window.wxoLoader.init()
            initCalledRef.current = true
            setIsLoading(false)
          } catch (err) {
            setIsLoading(false)
          }
        }
        return
      }

      // Create and inject the script - matching original implementation
      setTimeout(() => {
        const script = document.createElement("script")
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`
        script.async = true

        script.addEventListener("load", () => {
          scriptLoadedRef.current = true
          setIsLoading(false)

          // Initialize after script loads - matching original
          if (window.wxoLoader && !initCalledRef.current) {
            try {
              window.wxoLoader.init()
              initCalledRef.current = true
              
              // Style chat widget to be centered and horizontal after widget initializes
              setTimeout(() => {
                const rootElement = document.getElementById("root")
                if (rootElement) {
                  // Find and style chat widgets to be centered and horizontal
                  const styleChatWidget = (widget: any) => {
                    if (widget) {
                      widget.style.position = "relative"
                      widget.style.top = "auto"
                      widget.style.left = "auto"
                      widget.style.right = "auto"
                      widget.style.bottom = "auto"
                      widget.style.width = "100%"
                      widget.style.height = "100%"
                      widget.style.maxWidth = "100%"
                      widget.style.border = "none"
                      widget.style.borderRadius = "0"
                      widget.style.zIndex = "1"
                      widget.style.margin = "0"
                    }
                  }
                  
                  const chatWidgets = rootElement.querySelectorAll(
                    'iframe, [class*="chat"], [class*="widget"], [class*="floating"], [id*="chat"], [class*="wxo"]'
                  )
                  chatWidgets.forEach(styleChatWidget)
                  
                  // Change welcome message from "Where should we begin?" to "Pace"
                  const changeWelcomeMessage = () => {
                    // Look for the welcome message text
                    const allText = rootElement.innerText || rootElement.textContent || ""
                    if (allText.includes("Where should we begin") || allText.includes("where should we begin")) {
                      // Find and replace the text
                      const walker = document.createTreeWalker(
                        rootElement,
                        NodeFilter.SHOW_TEXT,
                        null
                      )
                      
                      let node
                      while ((node = walker.nextNode())) {
                        if (node.textContent?.includes("Where should we begin") || node.textContent?.includes("where should we begin")) {
                          node.textContent = node.textContent.replace(/Where should we begin\?/gi, "Pace")
                        }
                      }
                    }
                    
                    // Also try to find by common class names
                    const welcomeElements = rootElement.querySelectorAll(
                      '[class*="welcome"], [class*="greeting"], [class*="initial"], [class*="message"]'
                    )
                    welcomeElements.forEach((el) => {
                      if (el.textContent?.includes("Where should we begin") || el.textContent?.includes("where should we begin")) {
                        el.textContent = el.textContent.replace(/Where should we begin\?/gi, "Pace")
                      }
                    })
                  }
                  
                  // Try to change welcome message after a delay
                  setTimeout(changeWelcomeMessage, 1000)
                  setTimeout(changeWelcomeMessage, 2000)
                  setTimeout(changeWelcomeMessage, 3000)
                  
                  // Also check for dynamically added elements
                  const observer = new MutationObserver(() => {
                    const newWidgets = rootElement.querySelectorAll(
                      'iframe, [class*="chat"], [class*="widget"], [class*="floating"], [id*="chat"], [class*="wxo"]'
                    )
                    newWidgets.forEach(styleChatWidget)
                    changeWelcomeMessage()
                  })
                  
                  observer.observe(rootElement, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                  })
                }
              }, 500)
            } catch (err) {
              // Widget may still work even if init throws
            }
          }
        })

        script.addEventListener("error", () => {
          setIsLoading(false)
          setError("Unable to load IBM Watson Orchestrate. Please check your connection and try again.")
          console.error = originalError
          console.warn = originalWarn
        })

        document.head.appendChild(script)
      }, 0)

      // Listen for auth token needed events
      const authEventListener = (e: CustomEvent) => {
        if (e.type === "authTokenNeeded" || e.detail?.type === "authTokenNeeded") {
          handleAuthTokenNeeded(e.detail || e)
        }
      }

      // Set up event listeners for auth
      window.addEventListener("authTokenNeeded" as any, authEventListener)
      document.addEventListener("authTokenNeeded" as any, authEventListener)

      // Cleanup function
      return () => {
        console.error = originalError
        console.warn = originalWarn
        window.removeEventListener("authTokenNeeded" as any, authEventListener)
        document.removeEventListener("authTokenNeeded" as any, authEventListener)
      }
    } catch (err) {
      console.error = originalError
      console.warn = originalWarn
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col" style={{ height: "calc(100vh - 56px)", maxHeight: "calc(100vh - 56px)" }}>
      {error ? (
        <Card className="p-8 text-center border-destructive/50 bg-destructive/10 m-auto max-w-md">
          <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Unable to Load AI Agent</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Refresh Page
          </button>
        </Card>
      ) : (
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-full absolute inset-0 z-10 bg-background">
              <div className="text-center space-y-4">
                <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Loading AI Career Agent...</p>
              </div>
            </div>
          )}
          <div 
            id="root" 
            className="w-full h-full relative chat-container flex-1" 
            style={{ 
              height: "100%",
              position: "relative",
              zIndex: 1,
              maxHeight: "calc(100vh - 56px)"
            }} 
          />
        </>
      )}
    </div>
  )
}

