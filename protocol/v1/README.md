# Browser Diagnostics protocol v1

This directory is the public, normative contract between the browser extension
and Kora Desktop's loopback bridge.

The protocol is local, authenticated, and explicitly paired. Schema files and
fixtures describe message payloads only; they never contain credentials,
localhost ports, real project paths, or diagnostic data.

Kora Desktop 1.5.0 is the first supported desktop version. Additive changes may
be made in protocol v1 when both participants negotiate an optional capability.
Breaking changes require a new protocol version.

