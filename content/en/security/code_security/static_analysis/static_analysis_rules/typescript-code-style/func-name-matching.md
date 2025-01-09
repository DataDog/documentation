---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/func-name-matching
- /static_analysis/rules/typescript-code-style/func-name-matching
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/func-name-matching
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Function names must match the name of the assignation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/func-name-matching`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Use the same name between your function declaration and the variable or property to which it is assigned.

## Non-Compliant Code Examples
```typescript
let foo = function bar() {};
let foo = function bar() {};
foo = function bar() {};
foo &&= function bar() {};
obj.foo ||= function bar() {};
obj['foo'] ??= function bar() {};
obj.foo = function bar() {};
obj.bar.foo = function bar() {};
obj['foo'] = function bar() {};
let obj = {foo: function bar() {}};
let obj = {'foo': function bar() {}};
({['foo']: function bar() {}});
// NOT SUPPORTED
// module.exports = function foo(name) {};
// module.exports = function foo(name) {};
// module.exports = function exports(name) {};
// module['exports'] = function foo(name) {};
// module['exports'] = function foo(name) {};
// module['exports'] = function exports(name) {};
// Object.defineProperty(foo, 'bar', { value: function baz() {} });
// Object.defineProperties(foo, { bar: { value: function baz() {} } });
// Object.create(proto, { bar: { value: function baz() {} } });
// var obj = { value: function foo(name) {} };
// Object.defineProperty(foo, 'bar', { value: function bar() {} });
// Object.defineProperties(foo, { bar: { value: function bar() {} } });
// Object.create(proto, { bar: { value: function bar() {} } });
// Reflect.defineProperty(foo, 'bar', { value: function baz() {} });
// Reflect.defineProperty(foo, 'bar', { value: function bar() {} });
foo({ value: function bar() {} });
(obj?.aaa).foo = function bar() {};
// Object?.defineProperty(foo, 'bar', { value: function baz() {} });
// (Object?.defineProperty)(foo, 'bar', { value: function baz() {} });
// Object?.defineProperty(foo, 'bar', { value: function bar() {} });
// (Object?.defineProperty)(foo, 'bar', { value: function bar() {} });
// Object?.defineProperties(foo, { bar: { value: function baz() {} } });
// (Object?.defineProperties)(foo, { bar: { value: function baz() {} } });
// Object?.defineProperties(foo, { bar: { value: function bar() {} } });
// (Object?.defineProperties)(foo, { bar: { value: function bar() {} } });
class C { x = function y() {}; }
class C { 'x' = function y() {}; }
class C { ['x'] = function y() {}; }
class C { static x = function y() {}; }
(class { x = function y() {}; })
var obj = { '\u1885': function foo() {} };

```

## Compliant Code Examples
```typescript
var foo;
var foo = function foo() {};
var foo = function foo() {};
var foo = function() {}
var foo = () => {}
foo = function foo() {};
foo = function foo() {};
foo &&= function foo() {};
obj.foo ||= function foo() {};
obj['foo'] ??= function foo() {};
obj.foo = function foo() {};
obj.foo = function foo() {};
obj.foo = function() {};
obj.foo = function() {};
obj.bar.foo = function foo() {};
obj.bar.foo = function foo() {};
obj['foo'] = function foo() {};
obj['foo'] = function foo() {};
// This are not equal not sure why eslint skips them
// obj['foo//bar'] = function foo() {};
// obj['foo//bar'] = function foo() {};
// obj['foo//bar'] = function foo() {};
obj[foo] = function bar() {};
obj[foo] = function bar() {};
var obj = {foo: function foo() {}};
var obj = {foo: function foo() {}};
var obj = {'foo': function foo() {}};
var obj = {'foo': function foo() {}};
var obj = {foo: function() {}};
var obj = {foo: function() {}};
var obj = {foo: function() {}};
var obj = {[foo]: function bar() {}}
var obj = {['x' + 2]: function bar() {}};
obj['x' + 2] = function bar(){};
var [ bar ] = [ function bar(){} ];
function a(foo = function bar() {}) {}
// NOT SUPPORTED
// module.exports = function foo(name) {};
// module['exports'] = function foo(name) {};
// module.exports = function foo(name) {};
// module.exports = function foo(name) {};
// module.exports = function foo(name) {};
// module['exports'] = function foo(name) {};
// module['exports'] = function foo(name) {};
// module['exports'] = function foo(name) {};
({['foo']: function foo() {}})
({['foo']: function foo() {}})
({[foo]: function bar() {}})
({[null]: function foo() {}})
({[1]: function foo() {}})
({[true]: function foo() {}})
({[`x`]: function foo() {}})
({[/abc/]: function foo() {}})
({[[1, 2, 3]]: function foo() {}})
({[{x: 1}]: function foo() {}})
[] = function foo() {}
({} = function foo() {})
[a] = function foo() {}
({a} = function foo() {})
var [] = function foo() {}
var {} = function foo() {}
var [a] = function foo() {}
var {a} = function foo() {}
({ value: function value() {} })
obj.foo = function foo() {};
obj.bar.foo = function foo() {};
var obj = {foo: function foo() {}};
var obj = {foo: function() {}};
var obj = { value: function value() {} }
// NOT SUPPORTED
// Object.defineProperty(foo, 'bar', { value: function bar() {} })
// Object.defineProperties(foo, { bar: { value: function bar() {} } })
// Object.create(proto, { bar: { value: function bar() {} } })
// Object.defineProperty(foo, 'b' + 'ar', { value: function bar() {} })
// Object.defineProperties(foo, { ['bar']: { value: function bar() {} } })
// Object.create(proto, { ['bar']: { value: function bar() {} } })
// Object.defineProperty(foo, 'bar', { value() {} })
// Object.defineProperties(foo, { bar: { value() {} } })
// Object.create(proto, { bar: { value() {} } })
// Reflect.defineProperty(foo, 'bar', { value: function bar() {} })
// Reflect.defineProperty(foo, 'b' + 'ar', { value: function baz() {} })
// Reflect.defineProperty(foo, 'bar', { value() {} })
foo({ value: function value() {} })
class C { x = function () {}; }
class C { x = function () {}; }
class C { 'x' = function () {}; }
class C { #x = function () {}; }
class C { #x = function () {}; }
class C { [x] = function () {}; }
class C { [x] = function () {}; }
class C { ['x'] = function () {}; }
class C { x = function x() {}; }
class C { 'x' = function x() {}; }
class C { #x = function x() {}; }
class C { #x = function x() {}; }
class C { #x = function y() {}; }
class C { #x = function y() {}; }
class C { [x] = function x() {}; }
class C { [x] = function x() {}; }
class C { [x] = function y() {}; }
class C { [x] = function y() {}; }
class C { ['x'] = function x() {}; }
class C { 1 = function x0() {}; }
class C { 1 = function x1() {}; }
class C { [1] = function x0() {}; }
class C { [1] = function x1() {}; }
class C { [f()] = function g() {}; }
class C { [f()] = function f() {}; }
class C { static x = function x() {}; }
class C { x = (function y() {})(); }
class C { x = (function x() {})(); }
(class { x = function x() {}; })
class C { #x; foo() { this.#x = function x() {}; } }
class C { #x; foo() { this.#x = function x() {}; } }
class C { #x; foo() { this.#x = function y() {}; } }
class C { #x; foo() { this.#x = function y() {}; } }
class C { #x; foo() { a.b.#x = function x() {}; } }
class C { #x; foo() { a.b.#x = function x() {}; } }
class C { #x; foo() { a.b.#x = function y() {}; } }
class C { #x; foo() { a.b.#x = function y() {}; } }
```
