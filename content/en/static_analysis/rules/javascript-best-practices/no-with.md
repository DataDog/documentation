---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-with
  language: JavaScript
  severity: Error
title: The with statement can lead to ambiguous code
---
## Metadata
**ID:** `javascript-best-practices/no-with`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

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
