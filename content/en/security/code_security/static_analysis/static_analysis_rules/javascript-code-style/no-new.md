---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-new
- /static_analysis/rules/javascript-code-style/no-new
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-new
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid new operators outside of assignments or comparisons
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-new`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
A lonely instance is almost always useless. Do not create objects without assigning them to a variable that you will use later.

## Non-Compliant Code Examples
```javascript
new Date()
```

## Compliant Code Examples
```javascript
var a = new Date()
var a; if (a === new Date()) { a = false; }
```
