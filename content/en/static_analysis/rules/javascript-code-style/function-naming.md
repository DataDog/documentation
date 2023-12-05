---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-code-style/function-naming
  language: JavaScript
  severity: Notice
title: Function name should use camelCase or PascalCase
---
## Metadata
**ID:** `javascript-code-style/function-naming`

**Language:** JavaScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that the function uses `camelCase` or `PascalCase` in case it is an `Object`. Generator functions should always be `camelCase`.

## Non-Compliant Code Examples
```javascript
function My_Class() {}
function get_value() {}
function* GetValue() {}
function *get_value() {}
```

## Compliant Code Examples
```javascript
function MyClass() {}
function getValue() {}
function* getValue() {}
function *getValue() {}
```
