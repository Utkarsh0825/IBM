// TypeScript declarations for IBM Watson Orchestrate embed

interface WatsonOrchestrateConfig {
  orchestrationID: string
  hostURL: string
  rootElementID: string
  deploymentPlatform: string
  crn: string
  chatOptions: {
    agentId: string
    autoOpen?: boolean
    [key: string]: any
  }
  onAuthTokenNeeded?: (event: { authToken: string | null }) => void
  [key: string]: any
}

interface WatsonOrchestrateLoader {
  init: () => void
}

interface WatsonOrchestrateAuthEvent {
  authToken: string | null
  setAuthToken: (token: string) => void
}

declare global {
  interface Window {
    wxOConfiguration?: WatsonOrchestrateConfig
    wxoLoader?: WatsonOrchestrateLoader
    wxOAuthTokenNeeded?: (event: WatsonOrchestrateAuthEvent) => void
  }
}

export {}

