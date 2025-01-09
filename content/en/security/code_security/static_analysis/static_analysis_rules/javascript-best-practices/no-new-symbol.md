---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-new-symbol
- /static_analysis/rules/javascript-best-practices/no-new-symbol
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-new-symbol
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid new statements with the Symbol object
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
