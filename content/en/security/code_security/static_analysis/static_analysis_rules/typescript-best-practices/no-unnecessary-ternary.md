---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-unnecessary-ternary
- /static_analysis/rules/typescript-best-practices/no-unnecessary-ternary
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-unnecessary-ternary
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid unnecessary ternary operations that return a boolean
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-unnecessary-ternary`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
This rule advises against the use of unnecessary ternary operations that return a boolean value. In JavaScript, the ternary operator `?  :` is a shorthand way of writing an `if-else` statement. However, if the result of the ternary operation is a boolean (such as `true` or `false`), it is often unnecessary because the condition itself already produces a boolean value.

The use of unnecessary ternary operations can lead to code that is harder to read and understand. Furthermore, it can lead to potential bugs if the ternary operation is not correctly written or understood. To adhere to this rule, you should return the condition itself rather than using a ternary operation.

## Non-Compliant Code Examples
```typescript
const foo = bar === 2 ? true : false;
const baz = quux === 3 ? false : true;
const notFoo = foo ? false : true;
call(foo ? foo : 1);
```

## Compliant Code Examples
```typescript
const foo = bar === 2;
const baz = quux !== 3;
const notFoo = !foo;
call(foo || 1);
```
