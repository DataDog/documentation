---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-code-style/no-array-constructor
  language: JavaScript
  severity: Warning
title: Avoid Array constructors
---
## Metadata
**ID:** `javascript-code-style/no-array-constructor`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
Array literal notation cannot be redefined. It is preferred over the Array constructor.

The Array constructor is a common source of errors as it might behave unexpectedly when used with a single parameter. It creates an array with of N length instead of initializing an Array with the provided param.


## Non-Compliant Code Examples
```javascript
new Array();
new Array;
new Array(x, y);
new Array(0, 1, 2);
```

## Compliant Code Examples
```javascript
new Array(x)
Array(x)
new Array(9)
Array(9)
new foo.Array()
foo.Array()
new Array.foo
Array.foo()
```
