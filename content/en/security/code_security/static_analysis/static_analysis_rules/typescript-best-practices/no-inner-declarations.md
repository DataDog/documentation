---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-inner-declarations
- /static_analysis/rules/typescript-best-practices/no-inner-declarations
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-inner-declarations
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid variable or function declaration in nested blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-inner-declarations`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
Function declarations in JavaScript are generally not block scoped. This rule prevents function declarations inside nested blocks like `if` statements. Move your declarations to the root of your program, body, or class.

## Non-Compliant Code Examples
```typescript
if (test) { function doSomething() { } }
if (foo) var a;
if (foo) /* some comments */ var a;
if (foo){ function f(){ if(bar){ var a; } } }
if (foo) function f(){ if(bar) var a; }
if (foo) { var fn = function(){} } 
if (foo)  function f(){} 
function bar() { if (foo) var a; }
if (foo){ var a; }
class C { method() { if(test) { var foo; } } }
class C { static { if (test) { function foo() {} } } }
class C { static { if (test) { var foo; } } }
class C { static { if (test) { if (anotherTest) { var foo; } } } }
```

## Compliant Code Examples
```typescript
function doSomething() { }
function doSomething() { function somethingElse() { } }
(function() { function doSomething() { } }());
function decl() { var fn = function expr() { }; }
function decl(arg) { var fn; if (arg) { fn = function() { }; } }
var x = {doSomething() {function doSomethingElse() {}}}
function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }
function decl(arg) { var fn; if (arg) { fn = function expr() { }; } }
if (test) { let x = 1; }
if (test) { const x = 1; }
function doSomething() { while (test) { var foo; } }
var foo;
var foo = 42;
function doSomething() { var foo; }
(function() { var foo; }());
foo(() => { function bar() { } });
var fn = () => {var foo;}
var x = {doSomething() {var foo;}}
export var foo;
export function bar() {}
export default function baz() {}
exports.foo = () => {}
exports.foo = function(){}
module.exports = function foo(){}
class C { method() { function foo() {} } }
class C { method() { var x; } }
class C { static { function foo() {} } }
class C { static { var x; } }
```
