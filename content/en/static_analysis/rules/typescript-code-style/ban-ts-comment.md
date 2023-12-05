---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-code-style/ban-ts-comment
  language: TypeScript
  severity: Notice
title: Avoid @ts-<directive> comments
---
## Metadata
**ID:** `typescript-code-style/ban-ts-comment`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Correct your types instead of disabling TypeScript.

## Non-Compliant Code Examples
```typescript
// @ts-expect-error
// @ts-ignore
// @ts-nocheck
// @ts-check
```

## Compliant Code Examples
```typescript
// just a comment containing @ts-expect-error somewhere
// just a comment containing @ts-ignore somewhere
// just a comment containing @ts-nocheck somewhere
// just a comment containing @ts-check somewhere

```
