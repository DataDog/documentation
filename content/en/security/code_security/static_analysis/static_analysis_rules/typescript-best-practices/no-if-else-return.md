---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-if-else-return
- /static_analysis/rules/typescript-best-practices/no-if-else-return
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-if-else-return
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid unnecessary if-else chains that only returns a boolean
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-if-else-return`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
This rule is designed to simplify your code by avoiding unnecessary if-else chains that only return a boolean. In JavaScript, it's not necessary to use an if-else statement to return a boolean value from a function. Instead, you can return the result of the boolean expression. This makes your code shorter, cleaner, and easier to understand.

## Non-Compliant Code Examples
```typescript
function getFoo() {
  const foo = computeFoo();
  if (foo) {
    return true;
  } else {
    return false;
  }
}
```

## Compliant Code Examples
```typescript
function getFoo() {
  const foo = computeFoo();
  return foo;
}
```
