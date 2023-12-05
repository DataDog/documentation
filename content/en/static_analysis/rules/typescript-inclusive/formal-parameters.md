---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-inclusive/formal-parameters
  language: TypeScript
  severity: Notice
title: Check parameter names for wording issues
---
## Metadata
**ID:** `typescript-inclusive/formal-parameters`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that some words are not used in the codebase and suggest a replacement when appropriate.

Examples of replacement suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```typescript
function a(master, slave) {}
function a(blacklist, whitelist?: boolean) {}
class A { foo(master: string, slave = 1) {} }

```

## Compliant Code Examples
```typescript
function denyList(primary, secondary) {}
```
