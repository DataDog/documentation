---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-best-practices/no-unsafe-negation
  language: TypeScript
  severity: Warning
title: Avoid negating the left operand of relational operators
---
## Metadata
**ID:** `typescript-best-practices/no-unsafe-negation`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Negation of the left-hand side of an expression is often unintended.

## Non-Compliant Code Examples
```typescript
!a in b
(!a in b)
!(a) in b
!a instanceof b
(!a instanceof b)
!(a) instanceof b
```

## Compliant Code Examples
```typescript
a in b
a in b === false
!(a in b);
(!a) in b
a instanceof b
a instanceof b === false;
!(a instanceof b);
(!a) instanceof b;

```
