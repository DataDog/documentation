---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-inclusive/comments
  language: TypeScript
  severity: Notice
title: Check comments for wording issues
---
## Metadata
**ID:** `typescript-inclusive/comments`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Check the variable names and suggest better names.

Examples of replacement suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```typescript
/**
 *  whitelist names to prevent unauthorized usage
 */

// she SHE should check her code

// he should check his
```

## Compliant Code Examples
```typescript
// allowlist names to prevent unauthorized usage

/* the comments do not have a history of issues */
```
