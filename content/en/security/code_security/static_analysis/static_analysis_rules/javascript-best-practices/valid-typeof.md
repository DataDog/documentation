---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/valid-typeof
- /static_analysis/rules/javascript-best-practices/valid-typeof
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Error Prone
  id: javascript-best-practices/valid-typeof
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Compare typeof expressions against valid strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/valid-typeof`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
Always compare typeof expressions against strings and make sure they are the correct values.

## Non-Compliant Code Examples
```javascript
typeof foo === 'strnig';
'strnig' === typeof foo;
if (typeof bar === 'umdefined') {};
typeof foo !== 'strnig';
'strnig' !== typeof foo;
if (typeof bar !== 'umdefined') {};
typeof foo != 'strnig';
'strnig' != typeof foo;
if (typeof bar != 'umdefined') {};
typeof foo == 'strnig';
'strnig' == typeof foo;
if (typeof bar == 'umdefined') {};
if (typeof bar === `umdefined`) {};
typeof foo == 'invalid string';
if (typeof bar !== undefined) {};
typeof foo == Object;
typeof foo == {};
typeof foo === undefined;
undefined === typeof foo;
undefined == typeof foo;
typeof foo === `undefined${foo}`;
typeof foo === `${string}`;
```

## Compliant Code Examples
```javascript
typeof foo === 'string';
typeof foo === 'object';
typeof foo === 'function';
typeof foo === 'undefined';
typeof foo === 'boolean';
typeof foo === 'number';
typeof foo === 'bigint';
'string' === typeof foo;
'object' === typeof foo;
'function' === typeof foo;
'undefined' === typeof foo;
'boolean' === typeof foo;
'number' === typeof foo;
typeof foo === typeof bar;
typeof foo === baz;
typeof foo !== someType;
typeof bar != someType;
someType === typeof bar;
someType == typeof bar;
typeof foo == 'string';
typeof(foo) === 'string';
typeof(foo) !== 'string';
typeof(foo) == 'string';
typeof(foo) != 'string';
var oddUse = typeof foo + 'thing';
// since we don't have optios we are enforcing to always compare agaisnt strings
// function f(undefined) { typeof x === undefined };
typeof foo === 'number';
typeof foo === "number";
var baz = typeof foo + 'thing';
typeof foo === typeof bar;
typeof foo === `string`;
`object` === typeof foo;
// not supported by this rule, we cannot pretend that somethingElse will complete 'string'
// typeof foo === `str${somethingElse}`;
```
