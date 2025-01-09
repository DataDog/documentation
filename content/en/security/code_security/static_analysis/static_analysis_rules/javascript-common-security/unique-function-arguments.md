---
aliases:
- /continuous_integration/static_analysis/rules/javascript-common-security/unique-function-arguments
- /static_analysis/rules/javascript-common-security/unique-function-arguments
dependencies: []
disable_edit: true
group_id: javascript-common-security
meta:
  category: Error Prone
  id: javascript-common-security/unique-function-arguments
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Function argument names should be unique
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-common-security/unique-function-arguments`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
A function's parameter names should all be unique. Otherwise, a latter parameter will overwrite the former parameter. This behavior can lead to unintended bugs and it difficult to debug in the future.

## Non-Compliant Code Examples
```javascript
function addition(foo, bar, foo) {
  console.log(foo + bar + foo);
}

addition(1, 2, 3); // outputs 8
```

## Compliant Code Examples
```javascript
function addition(foo, bar, baz) {
  console.log(foo + bar + baz);
}

addition(1, 2, 3); // outputs 6
```
