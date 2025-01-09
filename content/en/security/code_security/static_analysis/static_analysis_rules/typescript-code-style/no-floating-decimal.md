---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-floating-decimal
- /static_analysis/rules/typescript-code-style/no-floating-decimal
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/no-floating-decimal
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid leading or trailing decimal points in numbers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-floating-decimal`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
To prevent confusion between the dot operator and the decimal point, always use a leading number when writing floating point numbers.

## Non-Compliant Code Examples
```typescript
var x = .5;
var x = -.5;
var x = 2.;
var x = -2.;
typeof.2
for(foo of.2);
```

## Compliant Code Examples
```typescript
var x = 2.5;
var x = "2.5";
var t = {
    ecmaVersion: 2018,
}
```
