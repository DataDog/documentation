---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/detect-non-literal-require
- /static_analysis/rules/javascript-node-security/detect-non-literal-require
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/detect-non-literal-require
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid require with non-literal values
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/detect-non-literal-require`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Importing packages from dynamic paths can be a security vulnerability. An attacker might provide an undesired path that leads to running arbitrary code or reading sensitive information from your file system.

In Node.js, the `require()` function is a built-in function that allows modules to be loaded. You can use it to include various types of files (like .js, .json, .node, etc) in your project.

If the argument to `require()` is a variable instead of a static string, and if that variable's value can be influenced by user input, then an attacker might be able to exploit this to run arbitrary code or read sensitive files from your server's disk. This is a serious security issue often referred to as arbitrary code execution.

Dynamic imports are a common source of arbitrary file read and code execution vulnerabilities. Avoid using variables with `require` or `import` statements. If you have an advanced use case that requires the use of dynamic imports, make sure to sanitize the input and have an allowed list of paths you can import code from. Always set the proper access control to your file system.

## Non-Compliant Code Examples
```javascript
var a = require(c);
var a = require(`${c}`);

```

## Compliant Code Examples
```javascript
var a = require('b');
var a = require(`b`);

```
