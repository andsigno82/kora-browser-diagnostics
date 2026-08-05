# Changelog

All notable changes to Kora Browser Diagnostics are documented here.

## [Unreleased]

## [0.2.0]

### Added

- Explicit active-tab capture foundation for runtime errors and unhandled promise
  rejections, with a bounded in-memory browser buffer.
- Public protocol v1 schema for a prepared diagnostic delivery.

## [0.1.2]

### Fixed

- Ignore generated WXT type output so a successful local verification leaves the
  extension checkout clean.

## [0.1.1]

### Fixed

- Made the WXT typecheck and Vitest configuration self-contained when the
  repository is mounted as a Kora submodule.

### Added

- Public WXT extension foundation and Browser Diagnostics protocol v1 contract.
