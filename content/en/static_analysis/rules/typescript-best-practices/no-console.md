---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-best-practices/no-console
  language: TypeScript
  severity: Warning
title: Avoid leaving console debug statements
---
## Metadata
**ID:** `typescript-best-practices/no-console`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Debugging with `console` is not considered a bad practice, but it's easy to forget about `console` statements and leave them in production code. There is no need to pollute production builds with debugging statements.

## Non-Compliant Code Examples
```typescript
console.log(foo)
console.error(foo)
console.info(foo)
console.warn(foo)
```

## Compliant Code Examples
```typescript
Console.info(foo)
```
