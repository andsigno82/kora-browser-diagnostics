export type DiagnosticLevel = 'error' | 'unhandledrejection'

export interface DiagnosticEvent {
  timestamp: string
  level: DiagnosticLevel
  message: string
  stack?: string
  source?: string
}

export interface DiagnosticMessage {
  kind: 'kora-browser-diagnostic'
  event: DiagnosticEvent
}

export const MAX_BUFFERED_EVENTS = 200

export function appendBoundedEvent(events: DiagnosticEvent[], event: DiagnosticEvent): DiagnosticEvent[] {
  return [...events, event].slice(-MAX_BUFFERED_EVENTS)
}

