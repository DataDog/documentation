---
aliases:
- /continuous_integration/static_analysis/rules/typescript-common-security/unique-function-arguments
- /static_analysis/rules/typescript-common-security/unique-function-arguments
dependencies: []
disable_edit: true
group_id: typescript-common-security
meta:
  category: Error Prone
  id: typescript-common-security/unique-function-arguments
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Function argument names should be unique
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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

export function useEditorStateTransform<Input, Output>(
    input: Input,
    transformByState: StateFunctions<Input, Output>,
    defaultValue: Input | null = input,
): Input | Output | null {
}

addition(1, 2, 3); // outputs 6
```
