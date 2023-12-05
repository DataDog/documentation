---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-delete-var
  language: JavaScript
  severity: Error
title: Avoid using delete on variables directly
---
## Metadata
**ID:** `javascript-best-practices/no-delete-var`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
The `delete` operator is designed to remove properties from objects in JavaScript. When used correctly, it can help manage object properties. However, using the `delete` operator on anything other than object properties can lead to unpredictable behavior.

## Non-Compliant Code Examples
```javascript
delete x
```

## Compliant Code Examples
```javascript
delete x.prop;
```
