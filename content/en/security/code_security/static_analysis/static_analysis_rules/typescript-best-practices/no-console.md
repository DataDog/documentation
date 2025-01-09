---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-console
- /static_analysis/rules/typescript-best-practices/no-console
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-console
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid leaving console debug statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-console`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Debugging with `console` is not considered a bad practice, but it's easy to forget about `console` statements and leave them in production code. There is no need to pollute production builds with debugging statements.

## Non-Compliant Code Examples
```typescript
console.log(foo)
console.error(foo)
console.info(foo)
console.warn(foo)
```

## Compliant Code Examples
```typescript
Console.info(foo)
```
