---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-debugger
- /static_analysis/rules/javascript-best-practices/no-debugger
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-debugger
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Disallow the use of debugger
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-debugger`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

**CWE**: [489](https://cwe.mitre.org/data/definitions/489.html)

## Description
The `debugger` statement is used to intentionally stop execution and start debugging at the point where the statement appears in the code. While it can be valuable during development and debugging, it can cause unwanted behaviors if it's present in production code.

## Non-Compliant Code Examples
```javascript
if (foo) debugger
```

## Compliant Code Examples
```javascript
var test = { debugger: 1 }; test.debugger;
```
