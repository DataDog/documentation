---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-const-assign
- /static_analysis/rules/javascript-best-practices/no-const-assign
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-const-assign
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Disallow reassigning const variables
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-const-assign`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
In JavaScript, assigning to a const variable is an error and causes an exception to be thrown at runtime. This rule disallows assigning to constant variable declarations.

## Non-Compliant Code Examples
```javascript
const a = 0;
a = 1;

const b = 0;
b += 1;

const c = 0;
++c;
```

## Compliant Code Examples
```javascript
const a = 0;
console.log(a);

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```
