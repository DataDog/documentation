---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-array-constructor
- /static_analysis/rules/javascript-code-style/no-array-constructor
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Error Prone
  id: javascript-code-style/no-array-constructor
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid Array constructors
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-array-constructor`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
Array literal notation cannot be redefined. It is preferred over the Array constructor.

The Array constructor is a common source of errors as it might behave unexpectedly when used with a single parameter. It creates an array with of N length instead of initializing an Array with the provided param.


## Non-Compliant Code Examples
```javascript
new Array();
new Array;
new Array(x, y);
new Array(0, 1, 2);
```

## Compliant Code Examples
```javascript
new Array(x)
Array(x)
new Array(9)
Array(9)
new foo.Array()
foo.Array()
new Array.foo
Array.foo()
```
