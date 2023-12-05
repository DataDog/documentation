---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-best-practices/no-proto
  language: JavaScript
  severity: Warning
title: Avoid the use of the __proto__ property
---
## Metadata
**ID:** `javascript-best-practices/no-proto`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
The `__proto__` property has been deprecated as of ECMAScript 3.1.

Use a suitable alternative to `__proto__` like `Object.getPrototypeOf` and `Object.setPrototypeOf` instead.

## Non-Compliant Code Examples
```javascript
var a = test.__proto__;
var a = test['__proto__'];
var a = test[`__proto__`];
test[`__proto__`] = function () {};
```

## Compliant Code Examples
```javascript
var a = test[__proto__];
var __proto__ = null;
foo[`__proto`] = null;
foo[`__proto__\n`] = null;
class C { #__proto__; foo() { this.#__proto__; } }
```
