---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-common-security/unique-function-arguments
  language: TypeScript
  severity: Warning
title: Function argument names should be unique
---
## Metadata
**ID:** `typescript-common-security/unique-function-arguments`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
A function's parameter names should all be unique. Otherwise, a latter parameter will overwrite the former parameter. This behavior can lead to unintended bugs and it difficult to debug in the future.

## Non-Compliant Code Examples
```typescript
function addition(foo: number, bar: number, foo: number) {
  console.log(foo + bar + foo);
}

addition(1, 2, 3); // outputs 8
```

## Compliant Code Examples
```typescript
function addition(foo: number, bar: number, baz: number) {
  console.log(foo + bar + baz);
}

addition(1, 2, 3); // outputs 6
```
