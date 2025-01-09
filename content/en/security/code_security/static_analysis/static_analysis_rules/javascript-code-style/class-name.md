---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/class-name
- /static_analysis/rules/javascript-code-style/class-name
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Code Style
  id: javascript-code-style/class-name
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Class name should be `PascalCase`
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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

class LongNameThatHa5SomeNumbers999 {}
```
