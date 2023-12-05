---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: javascript-code-style/no-return-assign
  language: JavaScript
  severity: Notice
title: Avoid assignment operators in return statements
---
## Metadata
**ID:** `javascript-code-style/no-return-assign`

**Language:** JavaScript

**Severity:** Notice

**Category:** Error Prone

## Description
JavaScript allows return statements to do assignment operations. Because it is hard to differentiate between an assignment and a comparison when written as part of the return statement, avoid using return statements.

## Non-Compliant Code Examples
```javascript
function x() { return result = a * b; };
function x() { return (result) = (a * b); };
function x() { return result = a * b; };
function x() { return (result) = (a * b); };
() => { return result = a * b; };
() => result = a * b;
function x() { return result = a * b; };
// Allow parens option not supported
// function x() { return (result = a * b); };
// function x() { return result || (result = a * b); };
function foo(){
    return a = b
}
function doSomething() {
    return foo = bar && foo > 0;
}
function doSomething() {
    return foo = function(){
        return (bar = bar1)
    }
}
function doSomething() {
    return foo = () => a
}
function doSomething() {
    return () => a = () => b
}
function foo(a){
    return function bar(b){
        return a = b
    }
}
const foo = (a) => (b) => a = b;

```

## Compliant Code Examples
```javascript
module.exports = {'a': 1};
var result = a * b;
function x() { var result = a * b; return result; }
function x() { return (result = a * b); }
function x() { var result = a * b; return result; }
function x() { return (result = a * b); }
function x() { var result = a * b; return result; }
function x() { return function y() { result = a * b }; }
() => { return (result = a * b); }
() => (result = a * b)
const foo = (a,b,c) => ((a = b), c)
function foo(){
    return (a = b)
}
function bar(){
    return function foo(){
        return (a = b) && c
    }
}
const foo = (a) => (b) => (a = b)
```
