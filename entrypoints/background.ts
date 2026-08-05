import { appendBoundedEvent, type DiagnosticEvent, type DiagnosticMessage } from '../lib/diagnostics'

export default defineBackground(() => {
const captureEnabledTabs = new Set<number>()
const eventsByTab = new Map<number, DiagnosticEvent[]>()

function injectPageObserver() {
  const marker = '__koraBrowserDiagnosticsCaptureV1'
  const currentWindow = window as Window & { [marker]?: boolean }
  if (currentWindow[marker]) return
  currentWindow[marker] = true

  const send = (event: DiagnosticEvent) => {
    browser.runtime.sendMessage({ kind: 'kora-browser-diagnostic', event } satisfies DiagnosticMessage).catch(() => {})
  }
  window.addEventListener('error', event => {
    const error = event.error instanceof Error ? event.error : undefined
    send({
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error?.message || event.message || 'Unknown page error',
      stack: error?.stack,
      source: event.filename || window.location.href,
    })
  }, true)
  window.addEventListener('unhandledrejection', event => {
    const error = event.reason instanceof Error ? event.reason : undefined
    send({
      timestamp: new Date().toISOString(),
      level: 'unhandledrejection',
      message: error?.message || String(event.reason ?? 'Unhandled promise rejection'),
      stack: error?.stack,
      source: window.location.href,
    })
  })
}

async function injectForActiveTab(tabId: number): Promise<void> {
  const scripting = (browser as typeof browser & { scripting?: { executeScript: (details: unknown) => Promise<unknown> } }).scripting
  if (scripting) {
    await scripting.executeScript({ target: { tabId }, func: injectPageObserver })
    return
  }
  await (browser.tabs as typeof browser.tabs & { executeScript: (tabId: number, details: unknown) => Promise<unknown> })
    .executeScript(tabId, { code: `(${injectPageObserver.toString()})()` })
}

const action = (browser.action ?? browser.browserAction) as typeof browser.action

action.onClicked.addListener(async tab => {
  if (tab.id === undefined) return
  captureEnabledTabs.add(tab.id)
  eventsByTab.set(tab.id, [])
  try {
    await injectForActiveTab(tab.id)
    await action.setTitle({ tabId: tab.id, title: 'Kora Browser Diagnostics: capturing this tab' })
  } catch (error) {
    captureEnabledTabs.delete(tab.id)
    eventsByTab.delete(tab.id)
    console.warn('[kora-browser-diagnostics] capture injection failed', error)
  }
})

browser.runtime.onMessage.addListener((message: DiagnosticMessage, sender) => {
  if (message?.kind !== 'kora-browser-diagnostic' || sender.tab?.id === undefined) return
  const tabId = sender.tab.id
  if (!captureEnabledTabs.has(tabId)) return
  eventsByTab.set(tabId, appendBoundedEvent(eventsByTab.get(tabId) ?? [], message.event))
})

browser.tabs.onRemoved.addListener(tabId => {
  captureEnabledTabs.delete(tabId)
  eventsByTab.delete(tabId)
})
})
