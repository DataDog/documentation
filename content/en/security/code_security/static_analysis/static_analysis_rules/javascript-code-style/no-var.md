---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-var
- /static_analysis/rules/javascript-code-style/no-var
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-var
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Require let or const instead of var
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-var`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
Block scoped lexical declarations like `let` and `const` are preferred over `var`. Block scope is common in many other programming languages and helps programmers avoid mistakes.

## Non-Compliant Code Examples
```javascript
var foo = bar;
var foo = bar, toast = most;
var foo = bar; let toast = most;
for (var a of b) { console.log(a); }
for (var a in b) { console.log(a); }
for (let a of b) { var c = 1; console.log(c); }
for (var i = 0; i < list.length; ++i) { foo(i) }
for (var i = 0; i < 10; ++i) {};
for (var a of b) { arr.push(() => a); }
for (let a of b) { var c; console.log(c); c = 'hello'; }
var a = a;
var {a = a} = {};
var {a = b, b} = {};
let {a, b = a} = {};
var a = b, b = 1;
let a = b; var b = 1;
function foo() { a } var a = 1; foo();
if (foo) var bar = 1;
var foo = 1;
{ var foo = 1 }
if (true) { var foo = 1 }
var foo = 1;
declare var foo = 2;
function foo() { var let; }
function foo() { var { let } = {}; }
function foo() { a }
var a = 1; foo();

```

## Compliant Code Examples
```javascript
const JOE = 'schmoe';
let moo = 'car';
const JOE = 'schmoe';
let moo = 'car';
```
