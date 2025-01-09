---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-multi-assign
- /static_analysis/rules/javascript-code-style/no-multi-assign
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-multi-assign
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Avoid the use of chained assignment expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-multi-assign`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
Assigning multiple variables at once can be hard to understand. Make one expression per assignment instead.

## Non-Compliant Code Examples
```javascript
var a = b = c;
var a = b = c = d;
let foo = bar = cee = 100;
a=b=c=d=e;
a=b=c;
a
=b
=c;
var a = (b) = (((c)));
var a = ((b)) = (c);
var a = b = ( (c * 12) + 2);
var a =
((b))
 = (c);
a = b = '=' + c + 'foo';
a = b = 7 * 12 + 5;
const x = {};
const y = x.one = 1;
let a, b;a = b = 1;
let x, y;x = y = 'baz';
const a = b = 1;
class C { field = foo = 0 }
class C { field = foo = 0 }
```

## Compliant Code Examples
```javascript
var a, b, c,
d = 0;
var a = 1; var b = 2; var c = 3;
var d = 0;
var a = 1 + (b === 10 ? 5 : 4);
const a = 1, b = 2, c = 3;
const a = 1;
const b = 2;
const c = 3;
for(var a = 0, b = 0;;){}
for(let a = 0, b = 0;;){}
for(const a = 0, b = 0;;){}
export let a, b;
export let a,
 b = 0;
// ignore non declaration option not supported
// const x = {};const y = {};x.one = y.one = 1;
// let a, b;a = b = 1
class C { [foo = 0] = 0 }
```
