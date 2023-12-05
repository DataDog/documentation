---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-code-style/no-div-regex
  language: JavaScript
  severity: Notice
title: Avoid equal signs at the beginning of regular expressions
---
## Metadata
**ID:** `javascript-code-style/no-div-regex`

**Language:** JavaScript

**Severity:** Notice

**Category:** Error Prone

## Description
At the start of a regular expression literal, the characters `/=` can be mistaken for a division assignment operator.

## Non-Compliant Code Examples
```javascript
var f = function() { return /=foo/; };
```

## Compliant Code Examples
```javascript
var f = function() { return /foo/ig.test('bar'); };
var f = function() { return /\\=foo/; };
```
