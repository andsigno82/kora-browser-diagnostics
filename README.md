# Kora Browser Diagnostics

Kora Browser Diagnostics is the public browser extension for bringing selected
browser diagnostics into a Kora Desktop project and session.

It is designed for the browser people already use every day: Firefox and
Chromium-based browsers. It does not embed a browser in Kora.

## Status

Version 0.2.0 implements an engineering vertical slice: explicit active-tab
capture for page runtime errors and unhandled promise rejections, plus the
protocol schema consumed by Kora's development bridge. It has no public popup,
pairing, destination picker, or store release yet. Browser Diagnostics becomes
a public feature only when Kora Desktop 1.5 and the first signed extension
release are announced.

## Compatibility

The first public extension release will require:

- Kora Desktop 1.5.0 or later;
- Browser Diagnostics protocol v1;
- an explicit local pairing approved in Kora.

The extension and Kora have independent versions. Compatibility is negotiated
through the versioned local protocol in [`protocol/v1`](protocol/v1/).

## Development

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run check
npm run test
npm run build
npm run zip
```

The extension must remain buildable and testable after cloning this repository
alone. Do not import private files from the Kora Desktop repository.

## Privacy and safety

Collection will be opt-in per site or tab. The product must not intentionally
collect cookies, passwords, authorization headers, or request/response bodies.
Browser diagnostics are prepared in Kora as a pending reference; they are never
submitted to a chat automatically.

See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md).

## Licence

This project is licensed under the [Mozilla Public License 2.0](LICENSE).
