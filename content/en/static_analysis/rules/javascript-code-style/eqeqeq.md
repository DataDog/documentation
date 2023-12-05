---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-code-style/eqeqeq
  language: JavaScript
  severity: Notice
title: Enforce the use of === and !==
---
## Metadata
**ID:** `javascript-code-style/eqeqeq`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
In JavaScript, `==` and `!=` comparisons do type coercion, which can be confusing and may introduce potential errors. Use the type-safe equality operators `===` and `!==` instead.

## Non-Compliant Code Examples
```javascript
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
```javascript
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
```
