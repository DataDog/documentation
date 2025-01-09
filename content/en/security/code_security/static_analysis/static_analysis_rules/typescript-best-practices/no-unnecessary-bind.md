---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-unnecessary-bind
- /static_analysis/rules/typescript-best-practices/no-unnecessary-bind
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Performance
  id: typescript-best-practices/no-unnecessary-bind
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid bind calls that are unnecessary
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-unnecessary-bind`

**Language:** TypeScript

**Severity:** Warning

**Category:** Performance

## Description
This rule advises against the use of unnecessary `.bind()` calls in JavaScript. The `.bind()` method is used to create a new function that, when called, has its `this` keyword set to the provided value. However, unnecessary `.bind()` calls can lead to confusion about what `this` refers to, and they can also have a negative impact on performance.

The importance of this rule lies in the clarity and efficiency of your code. Unnecessary `.bind()` calls can make your code harder to understand and maintain. Moreover, they can result in slower code execution, as each `.bind()` call creates a new function.

To avoid violating this rule, only use `.bind()` when necessary, for example, when you need to set the `this` value for a function. Use arrow functions if you want to preserve the `this` value from the enclosing context. Also, avoid using `.bind()` in a loop, as it can lead to performance issues. Instead, create the bound function once and reference it within the loop.

## Non-Compliant Code Examples
```typescript
const func = function () {
    foo();
}.bind(bar);

const func = (() => {
    foo();
}).bind(bar);

const func = (() => {
    this.foo();
}).bind(bar);

const func = function () {
    (function () {
      this.foo();
    }());
}.bind(bar);

const func = function () {
    function foo() {
      this.bar();
    }
}.bind(baz);
```

## Compliant Code Examples
```typescript
const func = function () {
    this.foo();
}.bind(bar);

const func = function (baz) {
    return baz + 1;
}.bind(foo, bar);
```
