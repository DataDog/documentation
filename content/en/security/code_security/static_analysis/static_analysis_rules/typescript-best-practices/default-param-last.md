---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/default-param-last
- /static_analysis/rules/typescript-best-practices/default-param-last
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/default-param-last
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid default parameters before normal parameters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/default-param-last`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
This rule encourages the practice of defining default parameters after the normal parameters in a function declaration. This is to ensure that the function behaves as expected when it is called with fewer arguments.

Default parameters are used to initialize formal parameters with default values. They are useful when an argument is not provided in the function or if it is undefined. If the function is called with fewer arguments than the declared parameters, the normal parameter receives `undefined`, while the default parameter is initialized with the provided value.

To avoid this, ensure that normal parameters are always defined before default parameters. This ensures that the function behaves as expected and doesn't cause any unexpected results.

## Non-Compliant Code Examples
```typescript
function foo(a = false, b) {}
foo(undefined, "b")
```

## Compliant Code Examples
```typescript
function foo(a, b = false) {}
foo("a")
```
