---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/assignment-name
- /static_analysis/rules/javascript-code-style/assignment-name
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Code Style
  id: javascript-code-style/assignment-name
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Assignment name should use camelCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/assignment-name`

**Language:** JavaScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that variables and properties names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```javascript
var a = {
    MyProp: "should be camelCase",
    foo_bar: 0,
    #Priv: 2,
};
const my_var = {};
let FooBar = {};
const { a_b, ...Bla } = c;
const [a_b, ...Bla] = c;

const _bad_name = 200;
```

## Compliant Code Examples
```javascript
const a = { myProp: "", #priv: 1 };
const myVar = {};
const { a } = c;
const { a, ...b } = c;
const [a, ...b] = c;
process.env.PCKG_OS_NAME;
const md5 = 'foo';
const PCKG_OS_NAME = 'foo';
const _unusedVar = 200;
```
