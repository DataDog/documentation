---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: javascript-code-style/max-params
  language: JavaScript
  severity: Notice
title: Enforce a maximum number of parameters in a function
---
## Metadata
**ID:** `javascript-code-style/max-params`

**Language:** JavaScript

**Severity:** Notice

**Category:** Code Style

## Description
Having too many parameters can make your code hard to read. The parameters must be used in appropriate order. Forgetting the order of parameters can cause mistakes.

Too many parameters is a code smell. You should refactor your code in smaller reusable bits. While it may be valid to require more than four parameters, you should use object destructuring.

## Non-Compliant Code Examples
```javascript
function test(a, b, c, d) {}
var test = function(a, b, c, d, e) {};
var test = (a, b, c, d) => {};
(function(a, b, c, d) {});

// object property options
function test(a, b, c, d) {}
```

## Compliant Code Examples
```javascript
function test(d, e, f) {}
var test = function(a, b, c) {};
var test = (a, b, c) => {};
var test = function test(a, b, c) {};

// object property options
var test = function(a, b, c) {};
```
