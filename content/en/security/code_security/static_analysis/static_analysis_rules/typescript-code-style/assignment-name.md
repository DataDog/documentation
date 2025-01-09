---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/assignment-name
- /static_analysis/rules/typescript-code-style/assignment-name
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/assignment-name
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Assigment name should use camelCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/assignment-name`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that variables and properties names use `camelCase` and not `snake_case` or `PascalCase`.

## Non-Compliant Code Examples
```typescript
var a = {
    MyProp: "should be camelCase",
    #Priv: 2,
};
const my_var = {};
let FooBar = {};
const { a_b, ...Bla } = c;
const [a_b, ...Bla] = c;

```

## Compliant Code Examples
```typescript
const a = { myProp: "", #priv: 1 };
const myVar = {};
const { a } = c;
const { a, ...b } = c;
const [a, ...b] = c;
process.env.PCKG_OS_NAME;
const md5 = 'foo';
const PCKG_OS_NAME = 'foo';
const _unused = 1;
```
