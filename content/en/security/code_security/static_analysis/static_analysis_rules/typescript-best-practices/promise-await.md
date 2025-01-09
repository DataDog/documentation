---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/promise-await
- /static_analysis/rules/typescript-best-practices/promise-await
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/promise-await
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Ensure you don't use promises without `await`ing them first
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/promise-await`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
This rule is critical because it ensures promises are properly handled in JavaScript. Promises are objects that represent the eventual completion or failure of an asynchronous operation. Using a promise without `await`ing it can lead to unexpected behavior, as the promise might not yet be resolved or rejected at the time it's used.

To adhere to this rule, always use the `await` keyword when using a promise in a condition or loop. This ensures that the promise resolves or rejects before the condition or loop is evaluated.

## Non-Compliant Code Examples
```typescript
const foo = Promise.resolve('thing');

if (foo) {
}

const data = foo ? foo : bar;

while (foo) {
}
```

## Compliant Code Examples
```typescript
const foo = Promise.resolve('thing');

if (await foo) {
}

const data = (await foo) ? foo : bar;

while (await foo) {
}
```
