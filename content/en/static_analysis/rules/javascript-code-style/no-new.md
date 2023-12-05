---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-code-style/no-new
  language: JavaScript
  severity: Notice
title: Avoid new operators outside of assignments or comparisons
---
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
