---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-duplicate-case
- /static_analysis/rules/javascript-best-practices/no-duplicate-case
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-duplicate-case
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Avoid duplicate case labels
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-duplicate-case`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
It is easy to copy and paste a switch statement case, and leave behind duplicated test cases.

## Non-Compliant Code Examples
```javascript
var a = 1; switch (a) {case 1: break; case 1: break; case 2: break; default: break;}
var a = '1'; switch (a) {case '1': break; case '1': break; case '2': break; default: break;}
var a = 1, one = 1; switch (a) {case one: break; case one: break; case 2: break; default: break;}
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {case p.p.p1: break; case p.p.p1: break; default: break;}
var a = 1, f = function(b) { return b ? { p1: 1 } : { p1: 2 }; }; switch (a) {case f(true).p1: break; case f(true).p1: break; default: break;}
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(a + 1).p1: break; case f(a + 1).p1: break; default: break;}
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(a === 1 ? 2 : 3).p1: break; case f(a === 1 ? 2 : 3).p1: break; default: break;}
var a = 1, f1 = function() { return { p1: 1 } }; switch (a) {case f1().p1: break; case f1().p1: break; default: break;}
var a = [1, 2]; switch(a.toString()){case ([1, 2]).toString():break; case ([1, 2]).toString():break; default:break;}
switch (a) { case a: case a: }
switch (a) { case a: break; case b: break; case a: break; case c: break; case a: break; }
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(a + 1).p1: break; case f(a+1).p1: break; default: break;}
// limitations
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {case p.p.p1: break; case p. p // comment
 .p1: break; default: break;}
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {case p .p
    /* comment */
    .p1: break; case p.p.p1: break; default: break;}
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {case p .p
    /* comment */
    .p1: break; case p. p // comment
 .p1: break; default: break;}
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {
    case p.p.p1: break; case p. p // comment
     .p1: break; case p .p
     /* comment */
     .p1: break; default: break;}
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(
    a + 1 // comment
    ).p1: break; case f(a+1)
    .p1: break; default: break;}
```

## Compliant Code Examples
```javascript
var a = 1; switch (a) {case 1: break; case 2: break; default: break;}
var a = 1; switch (a) {case 1: break; case '1': break; default: break;}
var a = 1; switch (a) {case 1: break; case true: break; default: break;}
var a = 1; switch (a) {default: break;}
var a = 1, p = {p: {p1: 1, p2: 1}}; switch (a) {case p.p.p1: break; case p.p.p2: break; default: break;}
var a = 1, f = function(b) { return b ? { p1: 1 } : { p1: 2 }; }; switch (a) {case f(true).p1: break; case f(true, false).p1: break; default: break;}
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(a + 1).p1: break; case f(a + 2).p1: break; default: break;}
var a = 1, f = function(s) { return { p1: s } }; switch (a) {case f(a == 1 ? 2 : 3).p1: break; case f(a === 1 ? 2 : 3).p1: break; default: break;}
var a = 1, f1 = function() { return { p1: 1 } }, f2 = function() { return { p1: 2 } }; switch (a) {case f1().p1: break; case f2().p1: break; default: break;}
var a = [1,2]; switch(a.toString()){case ([1,2]).toString():break; case ([1]).toString():break; default:break;}
switch(a) { case a: break; } switch(a) { case a: break; }
switch(a) { case toString: break; 
```
