---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-code-style/method-name
  language: JavaScript
  severity: Notice
title: Method name should use camelCase
---
## Metadata
**ID:** `javascript-code-style/method-name`

**Language:** JavaScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that method names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```javascript
const a = { GetValue() {} }
class A { set_value() {} }
class A { *set_value() {} }
class A { #set_value() {} }
class A { #SetValue() {} }
```

## Compliant Code Examples
```javascript
const a = { getValue() {} }
class A { setValue() {} }
class A { #fooBla() {} }
```
