---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-compare-neg-zero
- /static_analysis/rules/javascript-best-practices/no-compare-neg-zero
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-compare-neg-zero
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Direct comparison with -0 detected
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-compare-neg-zero`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
In JavaScript, `-0` and `+0` are considered to be equal (`(-0 === +0) // true`). However, they behave differently in some operations. For instance, `1/-0` results in `-Infinity`, while `1/+0` results in `+Infinity`. Directly comparing with `-0` can produce results that are hard to understand, and may lead to bugs.

## Non-Compliant Code Examples
```javascript
x === -0;
-0 === x;
x == -0;
-0 == x;
x > -0;
-0 > x;
x >= -0;
-0 >= x;
x < -0;
-0 < x;
x <= -0;
-0 <= x;
```

## Compliant Code Examples
```javascript
x === 0
0 === x
x == 0
0 == x
x === '0'
'0' === x
x == '0'
'0' == x
x === '-0'
'-0' === x
x == '-0'
'-0' == x
x === -1
-1 === x
x < 0
0 < x
x <= 0
0 <= x
x > 0
0 > x
x >= 0
0 >= x
x != 0
0 != x
x !== 0
0 !== x
Object.is(x, -0)
```
