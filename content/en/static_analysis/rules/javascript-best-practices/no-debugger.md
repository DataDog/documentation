---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-debugger
  language: JavaScript
  severity: Error
title: Disallow the use of debugger
---
## Metadata
**ID:** `javascript-best-practices/no-debugger`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

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
