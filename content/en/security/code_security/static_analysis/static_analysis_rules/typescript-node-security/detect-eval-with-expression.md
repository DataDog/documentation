---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/detect-eval-with-expression
- /static_analysis/rules/typescript-node-security/detect-eval-with-expression
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/detect-eval-with-expression
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid `eval` with expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/detect-eval-with-expression`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

## Description
The `eval` function could execute malicious code if used with non-literal values. The argument provided to the `eval` method could be use to execute malicious code, if an attacker manage to control the `eval` argument they can execute arbitrary code.

In JavaScript, the `eval()` function evaluates or executes an argument if it's a string of JavaScript code. If this argument is influenced by user input or other external sources, it can lead to security vulnerabilities. Specifically, if an attacker can control or manipulate the value of the `variable` in `eval(variable)`, they can execute arbitrary code.

It is recommended to avoid `eval` at all cost, but if you face an advance use case make sure to use literal values that are under you control or take actions to sanitize the input, even then it is still recommended to avoid the use of `eval` as it has lead to security breaches before.

## Non-Compliant Code Examples
```typescript
eval(a);
global.eval(a);
globalThis.eval(a);

const answer = eval(expression)
```

## Compliant Code Examples
```typescript
eval('alert()')
global.eval('a');
globalThis.eval('a');
```
