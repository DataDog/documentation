---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-best-practices/no-caller
  language: JavaScript
  severity: Warning
title: Avoid the use of arguments.caller or arguments.callee
---
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
