---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/strict-equals
- /static_analysis/rules/typescript-code-style/strict-equals
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Best Practices
  id: typescript-code-style/strict-equals
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Enforce the use of === and !==
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/strict-equals`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
In JavaScript, `==` and `!=` comparisons do type coercion, which can be confusing and may introduce potential errors. Use the type-safe equality operators `===` and `!==` instead.

## Non-Compliant Code Examples
```typescript
a == b
a != b
typeof a == 'number'
typeof a == 'number'
'string' != typeof a
true == true
2 == 3
2 == 3
'hello' != 'world'
'hello' != 'world'
a == null
a == null
null != a
true == 1
0 != '1'
'wee' == /wee/
typeof a == 'number'
'string' != typeof a
'hello' != 'world'
2 == 3
true == true
true == null
true != null
null == null
null != null
a
==
b
(a) == b
(a) != b
a == (b)
a != (b)
(a) == (b)
(a == b) == (c)
(a != b) != (c)
a == b;
a!=b;
(a + b) == c;
(a + b)  !=  c;
((1) )  ==  (2);

```

## Compliant Code Examples
```typescript
a === b
a !== b
a === b
a !== null
a === null
a !== null
null === null
null !== null

// https://github.com/eslint/eslint/issues/8020
foo === /abc/u

// bigint
foo === 1n

foo != undefined
```
