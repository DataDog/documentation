---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-best-practices/no-dupe-keys
  language: JavaScript
  severity: Error
title: Avoid duplicate keys in object literals
---
## Metadata
**ID:** `javascript-best-practices/no-dupe-keys`

**Language:** JavaScript

**Severity:** Error

**Category:** Error Prone

## Description
Object literals should not have duplicate keys. If you define an object with duplicate keys, the last one will overwrite any preceding ones.

## Non-Compliant Code Examples
```javascript
var x = { a: b, ['a']: b };
var x = { y: 1, y: 2 };
var x = { '': 1, '': 2 };
var x = { '': 1, [``]: 2 };
var foo = { 0x1: 1, 1: 2};
// should be captured by no-octal
// var x = { 012: 1, 10: 2 };
var x = { 0b1: 1, 1: 2 };
var x = { 0o1: 1, 1: 2 };
var x = { 1n: 1, 1: 2 };
var x = { 1_0: 1, 10: 2 };
var x = { "z": 1, z: 2 };
var foo = {
  bar: 1,
  bar: 1,
  bar() {}
}
var x = { a: 1, get ['a']() {} };
var x = { a: 1, set a(value) {} };
var x = { a: 1, b: { a: 2 }, get b() {} };
var x = ({ '/(?<zero>0)/': 1, [/(?<zero>0)/]: 2 })
```

## Compliant Code Examples
```javascript
var foo = { __proto__: 1, two: 2};
var x = { foo: 1, bar: 2 };
var x = { '': 1, bar: 2 };
var x = { '': 1, ' ': 2 };
var x = { '': 1, [null]: 2 };
var x = { '': 1, [a]: 2 };
var x = { [a]: 1, [a]: 2 };
+{ get a() { }, set a(b) { } };
var x = { a: b, [a]: b };
var x = { a: b, ...c }
var x = { get a() {}, set a (value) {} };
var x = { a: 1, b: { a: 2 } };
var x = ({ null: 1, [/(?<zero>0)/]: 2 })
var {a, a} = obj
// should be captured by no-octal
// var x = { 012: 1, 12: 2 };
var x = { 1_0: 1, 1: 2 };
```
