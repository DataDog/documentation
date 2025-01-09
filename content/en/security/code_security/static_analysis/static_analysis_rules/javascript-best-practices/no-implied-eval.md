---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-implied-eval
- /static_analysis/rules/javascript-best-practices/no-implied-eval
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Security
  id: javascript-best-practices/no-implied-eval
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Prevent the use methods similar to eval()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-implied-eval`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
JavaScript methods like `setTimeout()`, `setInterval()`, or `execScript()` can accept a string of code as their first argument. This code will be executed at runtime, opening a vector for potential attacks.

It is generally considered a bad practice to execute code at runtime. This rule considers these methods as implied evaluations when their parameter is a piece of code.

## Non-Compliant Code Examples
```javascript
setTimeout("x = 1;");
setTimeout("x = 1;", 100);
setInterval("x = 1;");
execScript("x = 1;");
// const s = 'x=1'; setTimeout(s, 100);
setTimeout(String('x=1'), 100);

// member expressions
window.setTimeout('foo');
window.setInterval('foo');
window['setTimeout']('foo');
window['setInterval']('foo');
window[`setInterval`]('foo');
window.window['setInterval']('foo');
global.setTimeout('foo');
global.setInterval('foo');
global['setTimeout']('foo');
global['setInterval']('foo');
global[`setInterval`]('foo');
global.global['setInterval']('foo');
globalThis.setTimeout('foo');
globalThis.setInterval('foo');

// template literals
setTimeout(`foo${bar}`);
window.setTimeout(`foo${bar}`);
window.window.setTimeout(`foo${bar}`);
global.global.setTimeout(`foo${bar}`);

// string concatenation
setTimeout('foo' + bar);
setTimeout(foo + 'bar');
setTimeout(`foo` + bar);
setTimeout(1 + ';' + 1);
window.setTimeout('foo' + bar);
window.setTimeout(foo + 'bar');
window.setTimeout(`foo` + bar);
window.setTimeout(1 + ';' + 1);
window.window.setTimeout(1 + ';' + 1);
global.setTimeout('foo' + bar);
global.setTimeout(foo + 'bar');
global.setTimeout(`foo` + bar);
global.setTimeout(1 + ';' + 1);
global.global.setTimeout(1 + ';' + 1);
globalThis.setTimeout('foo' + bar);

// gives the correct node when dealing with nesting
setTimeout('foo' + (function() {
   setTimeout(helper);
   execScript('str');
   return 'bar';
})());

window.setTimeout('foo' + (function() {
   setTimeout(helper);
   window.execScript('str');
   return 'bar';
})());

global.setTimeout('foo' + (function() {
   setTimeout(helper);
   global.execScript('str');
   return 'bar';
})());

// Optional chaining
window?.setTimeout('code', 0);
(window?.setTimeout)('code', 0);
```

## Compliant Code Examples
```javascript
setTimeout();

setTimeout;
setTimeout = foo;
window.setTimeout;
window.setTimeout = foo;
window['setTimeout'];
window['setTimeout'] = foo;
global.setTimeout;
global.setTimeout = foo;
global['setTimeout'];
global['setTimeout'] = foo;
globalThis['setTimeout'] = foo;

window[`SetTimeOut`]('foo', 100);
global[`SetTimeOut`]('foo', 100);
global[`setTimeout${foo}`]('foo', 100);
global[`setTimeout${foo}`]('foo', 100);
globalThis[`setTimeout${foo}`]('foo', 100);

// normal usage
setTimeout(function() { x = 1; }, 100);
setInterval(function() { x = 1; }, 100)
execScript(function() { x = 1; }, 100)
window.setTimeout(function() { x = 1; }, 100);
window.setInterval(function() { x = 1; }, 100);
window.execScript(function() { x = 1; }, 100);
window.setTimeout(foo, 100);
window.setInterval(foo, 100);
window.execScript(foo, 100);
global.setTimeout(function() { x = 1; }, 100);
global.setInterval(function() { x = 1; }, 100);
global.execScript(function() { x = 1; }, 100);
global.setTimeout(foo, 100);
global.setInterval(foo, 100);
global.execScript(foo, 100);
globalThis.setTimeout(foo, 100);

// only checks on top-level statements or window.*
foo.setTimeout('hi')

// identifiers are fine
setTimeout(foo, 10)
setInterval(1, 10)
execScript(2)

// as are function expressions
setTimeout(function() {}, 10)

// setInterval
foo.setInterval('hi')
setInterval(foo, 10)
setInterval(function() {}, 10)

// execScript
foo.execScript('hi')
execScript(foo)
execScript(function() {})

// a binary plus on non-strings doesn't guarantee a string
// setTimeout(foo + bar, 10)

// doesn't check anything but the first argument
setTimeout(foobar, 'buzz')
setTimeout(foobar, foo + 'bar')

// only checks immediate subtrees of the argument
setTimeout(function() { return 'foobar'; }, 10)

// https://github.com/eslint/eslint/issues/7821
setTimeoutFooBar('Foo Bar')

foo.window.setTimeout('foo', 100);
foo.global.setTimeout('foo', 100);
// var window; window.setTimeout('foo', 100);
// var global; global.setTimeout('foo', 100);
// function foo(window) { window.setTimeout('foo', 100); }
// function foo(global) { global.setTimeout('foo', 100); }
foo('', window.setTimeout);
foo('', global.setTimeout);
```
