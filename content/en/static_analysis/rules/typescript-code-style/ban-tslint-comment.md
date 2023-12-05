---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-code-style/ban-tslint-comment
  language: TypeScript
  severity: Warning
title: Avoid using TSLint comments
---
## Metadata
**ID:** `typescript-code-style/ban-tslint-comment`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
Do not disable TypeScript checks.

## Non-Compliant Code Examples
```typescript
/* tslint:disable */
/* tslint:enable */
/* tslint:disable:rule1 rule2 rule3... */
/* tslint:enable:rule1 rule2 rule3... */
// tslint:disable-next-line
someCode(); // tslint:disable-line
// tslint:disable-next-line:rule1 rule2 rule3...
```

## Compliant Code Examples
```typescript
// This is a comment that just happens to mention tslint
/* This is a multiline comment that just happens to mention tslint */
someCode(); // This is a comment that just happens to mention tslint
```
