---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-code-style/no-new
  language: TypeScript
  severity: Notice
title: Avoid new operators outside of assignments or comparisons
---
## Metadata
**ID:** `typescript-code-style/no-new`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
A lonely instance is almost always useless. Do not create objects without assigning them to a variable that you will use later.

## Non-Compliant Code Examples
```typescript
new Date()
```

## Compliant Code Examples
```typescript
var a = new Date()
var a; if (a === new Date()) { a = false; }
```
