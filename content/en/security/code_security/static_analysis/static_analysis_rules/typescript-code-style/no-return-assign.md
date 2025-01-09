---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-return-assign
- /static_analysis/rules/typescript-code-style/no-return-assign
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Error Prone
  id: typescript-code-style/no-return-assign
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid assignment operators in return statements
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-return-assign`

**Language:** TypeScript

**Severity:** Notice

**Category:** Error Prone

## Description
JavaScript allows return statements to do assignment operations. Because it is hard to differentiate between an assignment and a comparison when written as part of the return statement, avoid using return statements.

## Non-Compliant Code Examples
```typescript
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
```typescript
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
