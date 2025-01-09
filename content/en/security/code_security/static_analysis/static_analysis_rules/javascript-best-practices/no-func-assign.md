---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-func-assign
- /static_analysis/rules/javascript-best-practices/no-func-assign
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-func-assign
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Disallow reassigning function declarations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-func-assign`

**Language:** JavaScript

**Severity:** Error

**Category:** Best Practices

## Description
JavaScript interpreters might allow assigning to a function, but it is often a mistake and should not be allowed.

## Non-Compliant Code Examples
```javascript
function foo() {}
foo = bar;

function baz() {
    baz = bar;
}

var a = function hello() {
  hello = 123;
};
```

## Compliant Code Examples
```javascript
var foo = function () {}
foo = bar;

function baz(baz) { // `baz` is shadowed.
    baz = bar;
}

function qux() {
    var qux = bar;  // `qux` is shadowed.
}
```
