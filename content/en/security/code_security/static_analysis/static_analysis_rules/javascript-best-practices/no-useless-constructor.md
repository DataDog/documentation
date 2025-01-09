---
aliases:
- /continuous_integration/static_analysis/rules/javascript-best-practices/no-useless-constructor
- /static_analysis/rules/javascript-best-practices/no-useless-constructor
dependencies: []
disable_edit: true
group_id: javascript-best-practices
meta:
  category: Best Practices
  id: javascript-best-practices/no-useless-constructor
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid constructors that do nothing or only call super
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-best-practices/no-useless-constructor`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
This rule is designed to flag constructors that either do nothing or only call the `super` function. These constructors are unnecessary and can be safely removed. In JavaScript, if a class extends another class and does not have a constructor, it automatically calls the `super` function with all the arguments it receives.

Unnecessary constructors can lead to confusion for other developers who may be reading or maintaining your code. They might spend time trying to figure out why a constructor is there when it doesn't need to be, or they might assume that the constructor is doing something important when it's not. To follow this rule and write good, clean code, you should only write a constructor if it's doing something other than just calling `super`.

## Non-Compliant Code Examples
```javascript
class Foo {
    constructor () {}
}

class Bar extends Foo {
    constructor (...args) {
      super(...args);
    }
}
```

## Compliant Code Examples
```javascript
class Foo {}

class Bar {
    constructor () {
        doComputation();
    }
}

class Baz extends Foo {
    constructor() {
        super('baz arg');
    }
}

class Quux extends Foo {
    constructor() {
        super();
        doComputation();
    }
}
```
