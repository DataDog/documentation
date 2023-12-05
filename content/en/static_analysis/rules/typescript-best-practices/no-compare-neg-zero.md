---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-best-practices/no-compare-neg-zero
  language: TypeScript
  severity: Error
title: Direct comparison with -0 detected
---
## Metadata
**ID:** `typescript-best-practices/no-compare-neg-zero`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
In JavaScript, `-0` and `+0` are considered to be equal (`(-0 === +0) // true`). However, they behave differently in some operations. For instance, `1/-0` results in `-Infinity`, while `1/+0` results in `+Infinity`. Directly comparing with `-0` can produce results that are hard to understand, and may lead to bugs.

## Non-Compliant Code Examples
```typescript
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
```typescript
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
