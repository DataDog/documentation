---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-script-url
  language: JavaScript
  severity: Notice
title: Avoid using JavaScript in URLs
---
## Metadata
**ID:** `javascript-best-practices/no-script-url`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
JavaScript URLs are evaluated the same way `eval` is executed. This can lead to arbitrary code execution.

## Non-Compliant Code Examples
```javascript
var a = 'javascript:void(0);';
var a = 'javascript:';
var a = `javascript:`;
var a = `JavaScript:`;
```

## Compliant Code Examples
```javascript
var a = 'Hello World!';
var a = 10;
var url = 'xjavascript:'
var url = `xjavascript:`
var url = `${foo}javascript:`
var a = foo`javaScript:`;
```
