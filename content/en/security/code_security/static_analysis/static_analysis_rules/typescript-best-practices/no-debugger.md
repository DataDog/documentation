---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-debugger
- /static_analysis/rules/typescript-best-practices/no-debugger
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-debugger
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Disallow the use of debugger
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-debugger`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
The `debugger` statement is used to intentionally stop execution and start debugging at the point where the statement appears in the code. While it can be valuable during development and debugging, it can cause unwanted behaviors if it's present in production code.

## Non-Compliant Code Examples
```typescript
if (foo) debugger
```

## Compliant Code Examples
```typescript
var test = { debugger: 1 }; test.debugger;
```
