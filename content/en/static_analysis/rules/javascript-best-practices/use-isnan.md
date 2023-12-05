---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/use-isnan
  language: JavaScript
  severity: Error
title: Avoid direct comparison with NaN
---
## Metadata
**ID:** `javascript-best-practices/use-isnan`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
In JavaScript, `NaN` (Not-a-Number) is a unique value that is not equal to anything, including itself. This means any direct comparison with `NaN` using equality (`==`, `===`) or inequality (`!=`, `!==`) operators will always return `false`.

## Non-Compliant Code Examples
```javascript
123 == NaN;
123 === NaN;
NaN === "abc";
NaN =="abc";
123 != NaN;
123 !== NaN;
NaN !== "abc";
NaN != "abc";
NaN < "abc";
"abc" < NaN;
NaN > "abc";
"abc" > NaN;
NaN <= "abc";
"abc" <= NaN;
NaN >= "abc";
"abc" >= NaN;
123 == Number.NaN;
123 === Number.NaN;
Number.NaN === "abc";
Number.NaN == "abc";
123 != Number.NaN;
123 !== Number.NaN;
Number.NaN !== "abc";
Number.NaN != "abc";
Number.NaN < "abc";
"abc" < Number.NaN;
Number.NaN > "abc";
"abc" > Number.NaN;
Number.NaN <= "abc";
"abc" <= Number.NaN;
Number.NaN >= "abc";
"abc" >= Number.NaN;
x === Number?.NaN;
x === Number['NaN'];
```

## Compliant Code Examples
```javascript
var x = NaN;
isNaN(NaN) === true;
isNaN(123) !== true;
Number.isNaN(NaN) === true;
Number.isNaN(123) !== true;
foo(NaN + 1);
foo(1 + NaN);
foo(NaN - 1)
foo(1 - NaN)
foo(NaN * 2)
foo(2 * NaN)
foo(NaN / 2)
foo(2 / NaN)
var x; if (x = NaN) { }
var x = Number.NaN;
isNaN(Number.NaN) === true;
Number.isNaN(Number.NaN) === true;
foo(Number.NaN + 1);
foo(1 + Number.NaN);
foo(Number.NaN - 1)
foo(1 - Number.NaN)
foo(Number.NaN * 2)
foo(2 * Number.NaN)
foo(Number.NaN / 2)
foo(2 / Number.NaN)
var x; if (x = Number.NaN) { }
x === Number[NaN];
```
