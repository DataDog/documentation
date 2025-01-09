---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/func-names
- /static_analysis/rules/javascript-code-style/func-names
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/func-names
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Enforce named function expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/func-names`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
It is easier to debug your application code when you avoid anonymous functions so that the stack trace can show you meaningful error messages. This rule enforces all your function to be consistently declared with a name.

## Non-Compliant Code Examples
```javascript
Foo.prototype.bar = function() {};
(function(){}())
f(function(){})
var a = new Date(function() {});
var test = function(d, e, f) {};
new function() {}
Foo.prototype.bar = function() {};
(function(){}())
f(function(){})
var a = new Date(function() {});
new function() {}
var {foo} = function(){};
({ a: obj.prop = function(){} } = foo);
[obj.prop = function(){}] = foo;
var { a: [b] = function(){} } = foo;
function foo({ a } = function(){}) {};
export default function() {}
export default function() {}
export default (function(){});
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
(function*() {}())
var foo = bar(function *() {});
(function*() {}())
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
var foo = bar(function *() {});
var foo = function*() {};
(function*() {}())
class C { foo = function() {} }
class C { [foo] = function() {} }
class C { #foo = function() {} }
```

## Compliant Code Examples
```javascript
Foo.prototype.bar = function bar(){};
Foo.prototype.bar = () => {};
function foo(){}
function test(d, e, f) {}
new function bar(){}
exports = { get foo() { return 1; }, set bar(val) { return val; } };
({ foo() { return 1; } });
class A { constructor(){} foo(){} get bar(){} set baz(value){} static qux(){}}
function foo() {}
var a = function foo() {};
class A { constructor(){} foo(){} get bar(){} set baz(value){} static qux(){}}
({ foo() {} });
function foo() {}
var a = function foo() { foo(); };
class A { constructor(){} foo(){} get bar(){} set baz(value){} static qux(){}}
({ foo() {} });
export default function foo() {}
export default function foo() {}
export default function foo() {}
var foo = bar(function *baz() {});
```
