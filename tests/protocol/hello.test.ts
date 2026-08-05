import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const fixturePath = new URL('../../protocol/v1/fixtures/hello.chromium.json', import.meta.url)
const schemaPath = new URL('../../protocol/v1/schema/hello.json', import.meta.url)

describe('Browser Diagnostics protocol v1 hello fixture', () => {
  it('matches the public compatibility contract', () => {
    const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'))
    const schema = JSON.parse(readFileSync(schemaPath, 'utf8'))

    expect(fixture.protocolVersion).toBe(schema.properties.protocolVersion.const)
    expect(fixture.minimumKoraVersion).toBe(schema.properties.minimumKoraVersion.const)
    expect(schema.properties.browserFamily.enum).toContain(fixture.browserFamily)
    expect(schema.required.every((field: string) => field in fixture)).toBe(true)
  })
})
