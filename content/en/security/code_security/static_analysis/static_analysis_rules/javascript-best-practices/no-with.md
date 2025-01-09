---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-with
- /static_analysis/rules/javascript-best-practices/no-with
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-with
  language: JavaScript
  severity: Error
  severity_rank: 1
title: The with statement can lead to ambiguous code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-with`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

**CWE**: [710](https://cwe.mitre.org/data/definitions/710.html)

## Description
The `with` statement in JavaScript is used to add a given object's properties as variables in a specific block of code. While it may seem convenient, the `with` statement has several pitfalls and can lead to hard-to-diagnose problems.

## Non-Compliant Code Examples
```javascript
with(foo) { bar() }
```

## Compliant Code Examples
```javascript
foo.bar()
```
