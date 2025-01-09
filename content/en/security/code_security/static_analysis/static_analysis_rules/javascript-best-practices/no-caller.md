---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-caller
- /static_analysis/rules/javascript-best-practices/no-caller
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Error Prone
  id: javascript-best-practices/no-caller
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid the use of arguments.caller or arguments.callee
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-caller`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
`arguments.caller` and `arguments.callee` has been deprecated and forbidden in ECMAScript 5 strict mode.

## Non-Compliant Code Examples
```javascript
var x = arguments.callee;
var x = arguments.caller;
```

## Compliant Code Examples
```javascript
var x = arguments.length
var x = arguments
var x = arguments[0]
var x = arguments[caller]
```
