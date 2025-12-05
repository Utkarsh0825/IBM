"use client"

import { useEffect, useRef, useState } from "react"

export function GlobalChatWidget() {
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
        return
      }
      originalError.apply(console, args)
    }

    const suppressWatsonWarnings = (...args: any[]) => {
      const message = args[0]?.toString() || ""
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
      // Set Watson Orchestrate configuration
      window.wxOConfiguration = {
        orchestrationID: "2d036da4e6924f42b26c13056cf322b4_539cd33a-6108-4a44-8ec6-ba807623a916",
        hostURL: "https://us-south.watson-orchestrate.cloud.ibm.com",
        rootElementID: "global-chat-root",
        deploymentPlatform: "ibmcloud",
        crn: "crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/2d036da4e6924f42b26c13056cf322b4:539cd33a-6108-4a44-8ec6-ba807623a916::",
        chatOptions: {
          agentId: "17dd8177-09e1-4ab7-bc74-4498d276e38d",
        },
      }

      // Handle authTokenNeeded event
      const handleAuthTokenNeeded = (event: any) => {
        if (event && typeof event === "object") {
          try {
            if (event.authToken !== undefined) {
              event.authToken = null
            }
            if (typeof event.setAuthToken === "function") {
              event.setAuthToken("")
            }
          } catch (e) {
            // Ignore errors
          }
        }
      }

      window.wxOAuthTokenNeeded = handleAuthTokenNeeded

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="wxoLoader.js"]'
      )
      if (existingScript) {
        if (window.wxoLoader && !initCalledRef.current) {
          try {
            window.wxoLoader.init()
            initCalledRef.current = true
          } catch (err) {
            // Ignore
          }
        }
        return
      }

      // Create and inject the script
      setTimeout(() => {
        const script = document.createElement("script")
        script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`
        script.async = true

        script.addEventListener("load", () => {
          scriptLoadedRef.current = true

          if (window.wxoLoader && !initCalledRef.current) {
            try {
              window.wxoLoader.init()
              initCalledRef.current = true
              
                  // Remove white blocks and style chat widget
                  setTimeout(() => {
                const rootElement = document.getElementById("global-chat-root")
                if (rootElement) {
                  // Remove white background blocks - only keep the chat interface
                  const removeWhiteBlocks = () => {
                    // Make container and all parent divs transparent
                    rootElement.style.backgroundColor = 'transparent'
                    rootElement.style.background = 'transparent'
                    
                    // Find and hide white background divs that aren't the chat widget
                    const allDivs = rootElement.querySelectorAll('div')
                    allDivs.forEach((el: any) => {
                      if (el) {
                        const bgColor = window.getComputedStyle(el).backgroundColor
                        const computedBg = bgColor.toLowerCase()
                        const rect = el.getBoundingClientRect()
                        
                        // Hide large white background containers (wrapper divs)
                        if ((computedBg.includes('rgb(255') || computedBg.includes('white')) && rect.width > 200) {
                          // Check if this div contains an iframe (the actual chat)
                          const hasIframe = el.querySelector('iframe')
                          if (!hasIframe) {
                            // This is a wrapper div with white background - hide it
                            el.style.display = 'none'
                            el.style.visibility = 'hidden'
                            el.style.opacity = '0'
                            el.style.background = 'transparent'
                            el.style.backgroundColor = 'transparent'
                          } else {
                            // This div contains the iframe - make it transparent
                            el.style.background = 'transparent'
                            el.style.backgroundColor = 'transparent'
                          }
                        }
                        
                        // Make all divs transparent unless they contain the iframe
                        if (!el.querySelector('iframe')) {
                          el.style.background = 'transparent'
                          el.style.backgroundColor = 'transparent'
                        }
                      }
                    })
                    
                    // Ensure only the iframe/chat widget is visible with proper styling
                    const iframes = rootElement.querySelectorAll('iframe')
                    iframes.forEach((iframe: any) => {
                      if (iframe) {
                        iframe.style.display = 'block'
                        iframe.style.visibility = 'visible'
                        iframe.style.opacity = '1'
                        iframe.style.background = 'white'
                        iframe.style.backgroundColor = 'white'
                        iframe.style.borderRadius = '0.75rem'
                        iframe.style.border = '1px solid rgba(0, 0, 0, 0.1)'
                        iframe.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)'
                      }
                    })
                  }
                  
                  // Change welcome message to "Pace"
                  const changeWelcomeMessage = () => {
                    const allText = rootElement.innerText || rootElement.textContent || ""
                    if (allText.includes("Where should we begin") || allText.includes("where should we begin")) {
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
                  }
                  
                  // Remove white blocks and change message
                  setTimeout(() => {
                    removeWhiteBlocks()
                    changeWelcomeMessage()
                  }, 1000)
                  setTimeout(() => {
                    removeWhiteBlocks()
                    changeWelcomeMessage()
                  }, 2000)
                  setTimeout(() => {
                    removeWhiteBlocks()
                    changeWelcomeMessage()
                  }, 3000)
                  
                  const observer = new MutationObserver(() => {
                    removeWhiteBlocks()
                    changeWelcomeMessage()
                  })
                  
                  observer.observe(rootElement, {
                    childList: true,
                    subtree: true,
                    characterData: true,
                    attributes: true,
                    attributeFilter: ['style', 'class']
                  })
                }
              }, 500)
            } catch (err) {
              // Ignore
            }
          }
        })

        script.addEventListener("error", () => {
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
    }
  }, [])

  return (
    <div 
      id="global-chat-root" 
      className="fixed bottom-4 right-4 z-[9999]"
      style={{ 
        width: "380px", 
        height: "600px",
        maxWidth: "calc(100vw - 2rem)",
        maxHeight: "calc(100vh - 2rem)",
        background: "transparent",
        pointerEvents: "none",
        overflow: "visible"
      }} 
    />
  )
}

