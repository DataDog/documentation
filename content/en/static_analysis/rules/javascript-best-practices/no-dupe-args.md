---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-dupe-args
  language: JavaScript
  severity: Error
title: Function parameters redeclared
---
## Metadata
**ID:** `javascript-best-practices/no-dupe-args`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
In JavaScript, it's syntactically valid to define multiple parameters with the same name in a function definition. However, doing so is considered bad practice as the last argument value will override the preceding argument value which can lead to issues that are hard to debug.

## Non-Compliant Code Examples
```javascript
function a(a, b, b) {}
function a(a, a, a) {}
function a(a, b, a) {}
function a(a, b, a, b) {}
var a = function(a, b, b) {}
var a = function(a, a, a) {}
var a = function(a, b, a) {}
var a = function(a, b, a, b) {}
```

## Compliant Code Examples
```javascript
function a(a, b, c){}
var a = function(a, b, c){}
function a({a, b}, {c, d}){}
function a([ , a]) {}
function foo([[a, b], [c, d]]) {}
```
