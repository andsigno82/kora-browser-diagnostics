# Contributing

Contributions must preserve the following invariants:

1. The extension remains independently buildable from this repository.
2. Browser collection remains opt-in and uses the minimum required permissions.
3. The local bridge remains authenticated, paired, and loopback-only.
4. A browser transfer never automatically sends a Kora chat message.
5. Protocol changes update schemas, fixtures, compatibility tests, and release
   documentation together.

Run `npm run check`, `npm run test`, and `npm run build` before opening a pull
request once dependencies are installed.

