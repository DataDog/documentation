---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-unsafe-negation
- /static_analysis/rules/typescript-best-practices/no-unsafe-negation
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-unsafe-negation
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid negating the left operand of relational operators
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-unsafe-negation`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Negation of the left-hand side of an expression is often unintended.

## Non-Compliant Code Examples
```typescript
!a in b
(!a in b)
!(a) in b
!a instanceof b
(!a instanceof b)
!(a) instanceof b
```

## Compliant Code Examples
```typescript
a in b
a in b === false
!(a in b);
(!a) in b
a instanceof b
a instanceof b === false;
!(a instanceof b);
(!a) instanceof b;

```
