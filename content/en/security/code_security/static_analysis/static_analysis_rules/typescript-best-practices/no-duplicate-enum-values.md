---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-duplicate-enum-values
- /static_analysis/rules/typescript-best-practices/no-duplicate-enum-values
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-duplicate-enum-values
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid duplicate enum member values
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-duplicate-enum-values`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
An `enum` should not have duplicate values, which are usually not expected to be present.

## Non-Compliant Code Examples
```typescript
enum A {
    A = 1,
    B = 1,
}
enum B {
    A = 'A',
    B = 'A',
}
enum C {
  A = 'A',
  B = 'A',
  C = 1,
  D = 1,
}
enum E {
    A = 'A',
    B = 'A',
    C = 1,
    D = 1,
}

```

## Compliant Code Examples
```typescript
enum A {
  A,
  B,
}

enum B {
  A = 1,
  B,
}

enum C {
  A = 1,
  B = 2,
}

enum D {
  A = 'A',
  B = 'B',
}

enum E {
  A = 'A',
  B = 'B',
  C,
}

enum F {
  A = 'A',
  B = 'B',
  C = 2,
  D = 1 + 1,
}

enum G {
  A = 3,
  B = 2,
  C,
}

enum H {
  A = 'A',
  B = 'B',
  C = 2,
  D = foo(),
}

enum I {
  A = '',
  B = 0,
}

enum J {
  A = 0,
  B = -0,
  C = NaN,
}

```
