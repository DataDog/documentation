---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-caller
- /static_analysis/rules/typescript-best-practices/no-caller
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-caller
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid the use of arguments.caller or arguments.callee
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
