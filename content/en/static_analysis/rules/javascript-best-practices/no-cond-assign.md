---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-best-practices/no-cond-assign
  language: JavaScript
  severity: Error
title: Avoid assignment operators in conditional expressions
---
## Metadata
**ID:** `javascript-best-practices/no-cond-assign`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
While there might be valid reasons to use an assignment operation in a condition, it is very easy to mistake `=` with the more usual intended `==`. This rule prevents such mistakes, as it is easier to intentionally disable the rule than identify the error.

## Non-Compliant Code Examples
```javascript
var x; if (x = 0) { var b = 1; }
var x; while (x = 0) { var b = 1; }
var x = 0, y; do { y = x; } while (x = x + 1);
var x; for(; x+=1 ;){};
var x; if ((x) = (0));
if (someNode || (someNode = parentNode)) { }
if (someNode || (someNode = parentNode)) { }
while (someNode || (someNode = parentNode)) { }
do { } while (someNode || (someNode = parentNode));
for (; typeof l === 'undefined' ? (l = 0) : l; i++) { }
if (x = 0) { }
while (x = 0) { }
do { } while (x = x + 1);
for(; x = y; ) { }
var x; var b = (x = 0) ? 1 : 0;
var x; var b = x && (y = 0) ? 1 : 0;
(((3496.29)).bkufyydt = 2e308) ? foo : bar;


if ((someNode = someNode.parentNode) !== null) { }
if ((someNode = someNode.parentNode) !== null) { }
if (someNode || (someNode = parentNode)) { }
while (someNode || (someNode = parentNode)) { }
do { } while (someNode || (someNode = parentNode));
for (;someNode || (someNode = parentNode););
```

## Compliant Code Examples
```javascript
var x = 0; if (x == 0) { var b = 1; }
var x = 0; if (x == 0) { var b = 1; }
var x = 5; while (x < 5) { x = x + 1; }
if ((a = b));
while ((a = b));
do {} while ((a = b));
for (;(a = b););
for (;;) {}
if ((function(node) { return node = parentNode; })(someNode)) { }
if ((function(node) { return node = parentNode; })(someNode)) { }
if ((node => node = parentNode)(someNode)) { }
if ((node => node = parentNode)(someNode)) { }
if (function(node) { return node = parentNode; }) { }
if (function(node) { return node = parentNode; }) { }
x = 0;
var x; var b = (x === 0) ? 1 : 0;
switch (foo) { case a = b: bar(); }
switch (foo) { case a = b: bar(); }
switch (foo) { case baz + (a = b): bar(); }
```
