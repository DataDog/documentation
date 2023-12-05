---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-empty-character-class
  language: JavaScript
  severity: Error
title: Avoid empty character classes in regular expressions
---
## Metadata
**ID:** `javascript-best-practices/no-empty-character-class`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
In regular expressions, empty character classes do not match anything, and were likely used in error.

## Non-Compliant Code Examples
```javascript
var foo = /^abc[]/;
var foo = /foo[]bar/;
if (foo.match(/^abc[]/)) {}
if (/^abc[]/.test(foo)) {}
var foo = /[]]/;
var foo = /\[[]/;
var foo = /\\[\\[\\]a-z[]/;
var foo = /[]]/d;
```

## Compliant Code Examples
```javascript
var foo = /^abc[a-zA-Z]/;
var regExp = new RegExp("^abc[]");
var foo = /^abc/;
var foo = /[\\[]/;
var foo = /[\\]]/;
var foo = /[a-zA-Z\\[]/;
var foo = /[[]/;
var foo = /[\\[a-z[]]/;
var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;
var foo = /\\s*:\\s*/gim;
var foo = /[\\]]/uy;
var foo = /[\\]]/s;
var foo = /[\\]]/d;
var foo = /\[]/
```
