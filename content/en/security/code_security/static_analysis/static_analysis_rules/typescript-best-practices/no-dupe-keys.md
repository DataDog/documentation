---
aliases:
- /code_analysis/static_analysis_rules/typescript-best-practices/no-dupe-keys
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-dupe-keys
- /static_analysis/rules/typescript-best-practices/no-dupe-keys
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-dupe-keys
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid duplicate keys in object literals
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-dupe-keys`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
Object literals should not have duplicate keys. If you define an object with duplicate keys, the last one will overwrite any preceding ones.

## Non-Compliant Code Examples
```typescript
var x = { a: b, ['a']: b };
var x = { y: 1, y: 2 };
var x = { '': 1, '': 2 };
var x = { '': 1, [``]: 2 };
var foo = { 0x1: 1, 1: 2};
// should be captured by no-octal
// var x = { 012: 1, 10: 2 };
var x = { 0b1: 1, 1: 2 };
var x = { 0o1: 1, 1: 2 };
var x = { 1n: 1, 1: 2 };
var x = { 1_0: 1, 10: 2 };
var x = { "z": 1, z: 2 };
var foo = {
  bar: 1,
  bar: 1,
  bar() {}
}
var x = { a: 1, get ['a']() {} };
var x = { a: 1, set a(value) {} };
var x = { a: 1, b: { a: 2 }, get b() {} };
var x = ({ '/(?<zero>0)/': 1, [/(?<zero>0)/]: 2 })

// while we can't evaluate the value of the template string we will assume that
// two keys with the exact same template string will evaluate to the same key
const obj = {
    props: {
        [`${classes.foo} ${classes.bar}`]: (): boolean => {
            return null;
        },
        [`${classes.foo} ${classes.bar}`]: (): boolean => {
            return null;
        },
    }
}
```

## Compliant Code Examples
```typescript
var foo = { __proto__: 1, two: 2};
var x = { foo: 1, bar: 2 };
var x = { '': 1, bar: 2 };
var x = { '': 1, ' ': 2 };
var x = { '': 1, [null]: 2 };
var x = { '': 1, [a]: 2 };
var x = { [a]: 1, [a]: 2 };

var x = { a: b, [a]: b };
var x = { a: b, ...c }

var x = { a: 1, b: { a: 2 } };
var x = ({ null: 1, [/(?<zero>0)/]: 2 })
var {a, a} = obj
// should be captured by no-octal
// var x = { 012: 1, 12: 2 };
var x = { 1_0: 1, 1: 2 };

// template literals should be valid as long as they are not exactly the same
const obj = {
    props: {
        [`${classes.foo} ${classes.bar}`]: (): boolean => {
            return null;
        },
        [`${classes.baz} ${classes.bla}`]: (): boolean => {
            return null;
        },
    }
}
```
