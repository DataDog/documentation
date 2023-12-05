---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/detect-new-buffer
  language: JavaScript
  severity: Warning
title: Avoid Buffer(argument) with non-literal values
---
## Metadata
**ID:** `javascript-node-security/detect-new-buffer`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Dealing with binary data can be achieved with the Node.js Buffer class. However, if you use non-literal params, this could lead to malicious control over the value, resulting in an attack.

For example, a large number could allocate a significant amount of memory leading to a denial of service attack. It is recommended to use literal values that you can control to prevent these attacks.

## Non-Compliant Code Examples
```javascript
var a = new Buffer(c)
```

## Compliant Code Examples
```javascript
var a = new Buffer('test')
```
