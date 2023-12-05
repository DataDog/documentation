---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/require-yield
  language: JavaScript
  severity: Error
title: Require yield in generator functions
---
## Metadata
**ID:** `javascript-best-practices/require-yield`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
Generator functions must yield at some point. Otherwise, use a normal function.

## Non-Compliant Code Examples
```javascript
function* foo() { return 0; }
(function* foo() { return 0; })();
var obj = { *foo() { return 0; } }
class A { *foo() { return 0; } }
function* foo() { function* bar() { yield 0; } }
function* foo() { function* bar() { return 0; } yield 0; }
```

## Compliant Code Examples
```javascript
function foo() { return 0; }
function* foo() { yield 0; }
function* foo() { }
(function* foo() { yield 0; })();
(function* foo() { })();
var obj = { *foo() { yield 0; } };
var obj = { *foo() { } };
class A { *foo() { yield 0; } };
class A { *foo() { } }
```
