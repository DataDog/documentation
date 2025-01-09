---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/detect-new-buffer
- /static_analysis/rules/javascript-node-security/detect-new-buffer
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/detect-new-buffer
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid Buffer(argument) with non-literal values
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
