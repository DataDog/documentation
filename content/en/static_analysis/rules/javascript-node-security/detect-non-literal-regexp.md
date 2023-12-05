---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/detect-non-literal-regexp
  language: JavaScript
  severity: Warning
title: Detects non-literal values in regular expressions
---
## Metadata
**ID:** `javascript-node-security/detect-non-literal-regexp`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Creating a regular expression with user input can lead to a Regular Expression Denial of Service (ReDoS) attack. In this type of attack, a user can submit a very complex regular expression that takes too long to execute.

If you have an advanced use case that requires regex evaluation with user input, always make sure to sanitize the data and provide a safe timeout environment.

## Non-Compliant Code Examples
```javascript
var a = new RegExp(c, 'i');

```

## Compliant Code Examples
```javascript
var a = new RegExp('ab+c', 'i');

```
