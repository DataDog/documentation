---
aliases:
- /code_analysis/static_analysis_rules/typescript-code-style/max-params
- /continuous_integration/static_analysis/rules/typescript-code-style/max-params
- /static_analysis/rules/typescript-code-style/max-params
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/max-params
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Enforce a maximum number of parameters in a function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/max-params`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Having too many parameters can make your code hard to read. The parameters must be used in appropriate order. Forgetting the order of parameters can cause mistakes.

Too many parameters is a code smell. You should refactor your code in smaller reusable bits. While it may be valid to require more than four parameters, you should use object destructuring.

## Arguments

 * `max-params`: Maximum number of parameters. Default: 4.

## Non-Compliant Code Examples
```typescript
function test(a, b, c, d, e) {}
var test = function(a, b, c, d, e) {};
var test = (a, b, c, d, e) => {};
(function(a, b, c, d, e) {});

// object property options
function test(a, b, c, d, e) {}

```

## Compliant Code Examples
```typescript
function test(d, e, f) {}
var test = function(a, b, c) {};
var test = (a, b, c) => {};
var test = function test(a, b, c) {};

// object property options
var test = function(a, b, c) {};
```
