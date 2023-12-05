---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: typescript-code-style/no-floating-decimal
  language: TypeScript
  severity: Notice
title: Avoid leading or trailing decimal points in numbers
---
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
