---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-code-style/no-new-func
  language: TypeScript
  severity: Warning
title: Avoid new operators with the Function object
---
## Metadata
**ID:** `typescript-code-style/no-new-func`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
The Function constructor can lead to code similar to `eval` executions. Use function declarations instead of the Function constructor.

## Non-Compliant Code Examples
```typescript
var a = new Function("b", "c", "return b+c");
var a = Function("b", "c", "return b+c");
var a = Function.call(null, "b", "c", "return b+c");
var a = Function.apply(null, ["b", "c", "return b+c"]);
var a = Function.bind(null, "b", "c", "return b+c")();
var a = Function.bind(null, "b", "c", "return b+c");
var a = Function["call"](null, "b", "c", "return b+c");
var a = (Function?.call)(null, "b", "c", "return b+c");
const fn = () => { class Function {} }; new Function('', '');
var fn = function () { function Function() {} }; Function('', '');
```

## Compliant Code Examples
```typescript
var a = new _function("b", "c", "return b+c");
var a = _function("b", "c", "return b+c");
// Scoped re assign not supported
// class Function {}; new Function()
// const fn = () => { class Function {}; new Function() }
// function Function() {}; Function()
// var fn = function () { function Function() {}; Function() }
// var x = function Function() { Function(); }
call(Function)
new Class(Function)
foo[Function]()
foo(Function.bind)
Function.toString()
Function[call]()
```
