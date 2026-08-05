import { describe, expect, it } from 'vitest'

import { appendBoundedEvent, MAX_BUFFERED_EVENTS, type DiagnosticEvent } from '../lib/diagnostics'

const event = (index: number): DiagnosticEvent => ({
  timestamp: `2026-08-05T00:00:${index}.000Z`,
  level: 'error',
  message: `error ${index}`,
})

describe('appendBoundedEvent', () => {
  it('retains only the most recent bounded diagnostic events', () => {
    const buffered = Array.from({ length: MAX_BUFFERED_EVENTS }, (_, index) => event(index))
    const result = appendBoundedEvent(buffered, event(MAX_BUFFERED_EVENTS))
    expect(result).toHaveLength(MAX_BUFFERED_EVENTS)
    expect(result[0]?.message).toBe('error 1')
    expect(result.at(-1)?.message).toBe(`error ${MAX_BUFFERED_EVENTS}`)
  })
})
