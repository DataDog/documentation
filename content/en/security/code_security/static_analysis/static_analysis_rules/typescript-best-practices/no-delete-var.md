---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-delete-var
- /static_analysis/rules/typescript-best-practices/no-delete-var
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-delete-var
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid using delete on variables directly
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-delete-var`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
The `delete` operator is designed to remove properties from objects in JavaScript. When used correctly, it can help manage object properties. However, using the `delete` operator on anything other than object properties can lead to unpredictable behavior.

## Non-Compliant Code Examples
```typescript
delete x
```

## Compliant Code Examples
```typescript
delete x.prop;
```
