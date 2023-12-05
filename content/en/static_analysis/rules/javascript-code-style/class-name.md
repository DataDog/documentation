---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-code-style/class-name
  language: JavaScript
  severity: Warning
title: Class name should be PascalCase
---
## Metadata
**ID:** `javascript-code-style/class-name`

**Language:** JavaScript

**Severity:** Warning

**Category:** Code Style

## Description
Class names should be `PascalCase` and not `camelCase` or `snake_case`.

## Non-Compliant Code Examples
```javascript
class _runtimeMetricsStatus {}
class runtimeMetricsStatus {}
```

## Compliant Code Examples
```javascript
class MyClass {}
```
