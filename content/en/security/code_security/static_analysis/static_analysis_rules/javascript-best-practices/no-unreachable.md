---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-unreachable
- /static_analysis/rules/javascript-best-practices/no-unreachable
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-unreachable
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Disallow unreachable code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-unreachable`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
In JavaScript, any code following a `return`, `throw`, `continue`, or `break` statement is unreachable and will never be executed. The only exception here is declarations, which are valid because of JavaScript Hoisting.

## Non-Compliant Code Examples
```javascript
function fn() {
    x = 1;
    return x;
    x = 3; // this will never execute
}

class C extends B {
    #x; // this will never be added to instances

    constructor() {
        return {};
    }
}

function foo() {
    return true;
    console.log("done");
}

function bar() {
    throw new Error("Oops!");
    console.log("done");
}

function loop() {
    while(value) {
        break;
        console.log("done");
    }
}

function error() {
    throw new Error("Oops!");
    console.log("done");
}

function baz() {
    if (Math.random() < 0.5) {
        return;
    } else {
        throw new Error();
    }
    console.log("done");
}

function anotherLoop() {
    for (;;) {}
    console.log("done");
}

switch (foo) {
    case 1:
        break;
        x = 2;
}

class C extends B {
    #x; // unreachable
    #y = 1; // unreachable
    a; // unreachable
    b = 1; // unreachable

    constructor() {
        return {};
    }
}
```

## Compliant Code Examples
```javascript
function foo() {
    return bar();
    function bar() {
        return 1;
    }
}

function bar() {
    return x;
    var x;
}

switch (foo) {
    case 1:
        break;
        var x;
}

class D extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    constructor() {
        super();
    }
}

class E extends B {
    #x;
    #y = 1;
    a;
    b = 1;

    // implicit constructor always calls `super()`
}

class F extends B {
    static #x;
    static #y = 1;
    static a;
    static b = 1;

    constructor() {
        return {};
    }
}
```
