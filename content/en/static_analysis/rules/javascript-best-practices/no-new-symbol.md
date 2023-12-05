---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-new-symbol
  language: JavaScript
  severity: Error
title: Avoid new statements with the Symbol object
---
## Metadata
**ID:** `javascript-best-practices/no-new-symbol`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
Symbol is intended to be called as a function. Do not instantiate with new statements.

## Non-Compliant Code Examples
```javascript
var foo = new Symbol('foo');
function bar() { return function Symbol() {}; } var baz = new Symbol('baz');
```

## Compliant Code Examples
```javascript
var foo = Symbol('foo');
new foo(Symbol);
new foo(bar, Symbol)
```
