---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-best-practices/no-caller
  language: TypeScript
  severity: Warning
title: Avoid the use of arguments.caller or arguments.callee
---
## Metadata
**ID:** `typescript-best-practices/no-caller`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
`arguments.caller` and `arguments.callee` has been deprecated and forbidden in ECMAScript 5 strict mode.

## Non-Compliant Code Examples
```typescript
var x = arguments.callee;
var x = arguments.caller;
```

## Compliant Code Examples
```typescript
var x = arguments.length
var x = arguments
var x = arguments[0]
var x = arguments[caller]
```
