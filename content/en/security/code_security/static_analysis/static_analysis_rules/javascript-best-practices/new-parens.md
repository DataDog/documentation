---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/new-parens
- /static_analysis/rules/javascript-best-practices/new-parens
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/new-parens
  language: JavaScript
  severity: Notice
  severity_rank: 3
title: Invoking a constructor must use parentheses
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/new-parens`

**Language:** JavaScript

**Severity:** Notice

**Category:** Best Practices

## Description
This rule enforces the consistent use of parentheses in `new` statements. In JavaScript, you can omit parentheses when the constructor has no arguments, but you should always use them for consistency.

## Non-Compliant Code Examples
```javascript
// Default (Always)
var a = new Date;
var a = new Date
var a = new (Date);
var a = new (Date)
var a = (new Date)

// This `()` is `CallExpression`'s. This is a call of the result of `new Date`.
var a = (new Date)()
var a = new foo.Bar;
var a = (new Foo).bar;

// Explicit always
var a = new Date;
var a = new foo.Bar;
var a = (new Foo).bar;
var a = new new Foo()

// OPTION never not supported
// Never
// var a = new Date();
// var a = new Date()
// var a = new (Date)();
// var a = new (Date)()
// var a = (new Date())
// var a = (new Date())()
// var a = new foo.Bar();
// var a = (new Foo()).bar;
// var a = new new Foo()
```

## Compliant Code Examples
```javascript
// Default (Always)
var a = new Date();
var a = new Date(function() {});
var a = new (Date)();
var a = new ((Date))();
var a = (new Date());
var a = new foo.Bar();
var a = (new Foo()).bar;

// Explicit Always
var a = new Date();
var a = new foo.Bar();
var a = (new Foo()).bar;

// OPTION never not supported
// Never
// var a = new Date;
// var a = new Date(function() {});
// var a = new (Date);
// var a = new ((Date));
// var a = (new Date);
// var a = new foo.Bar;
// var a = (new Foo).bar;
// var a = new Person('Name')
// var a = new Person('Name', 12)
// var a = new ((Person))('Name');
```
