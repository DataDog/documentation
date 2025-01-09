---
aliases:
- /continuous_integration/static_analysis/rules/typescript-inclusive/formal-parameters
- /static_analysis/rules/typescript-inclusive/formal-parameters
dependencies: []
disable_edit: true
group_id: typescript-inclusive
meta:
  category: Code Style
  id: typescript-inclusive/formal-parameters
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Check parameter names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
