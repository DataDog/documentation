---
aliases:
- /continuous_integration/static_analysis/rules/javascript-node-security/detect-eval-with-expression
- /static_analysis/rules/javascript-node-security/detect-eval-with-expression
dependencies: []
disable_edit: true
group_id: javascript-node-security
meta:
  category: Security
  id: javascript-node-security/detect-eval-with-expression
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid `eval` with expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-node-security/detect-eval-with-expression`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
The `eval` function could execute malicious code if used with non-literal values. The argument provided to the `eval` method could be used to execute malicious code. If an attacker manages to control the `eval` argument they can execute arbitrary code.

In JavaScript, the `eval()` function evaluates or executes an argument if it's a string of JavaScript code. If this argument is influenced by user input or other external sources, it can lead to security vulnerabilities. Specifically, if an attacker can control or manipulate the value of the `variable` in `eval(variable)`, they can execute arbitrary code.

You should avoid using `eval` at all costs, but if you face an advanced use case, use literal values that are under your control or sanitize the input. However, even then it is still recommended to avoid the use of `eval` as it has led to security breaches before.

## Non-Compliant Code Examples
```javascript
eval(a);
global.eval(a);
globalThis.eval(a);

const answer = eval(expression)
```

## Compliant Code Examples
```javascript
eval('alert()')
global.eval('a');
globalThis.eval('a');
```
