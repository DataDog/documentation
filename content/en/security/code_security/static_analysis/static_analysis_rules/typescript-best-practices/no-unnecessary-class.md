---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-unnecessary-class
- /static_analysis/rules/typescript-best-practices/no-unnecessary-class
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-unnecessary-class
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid unnecessary classes containing only static members
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-unnecessary-class`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
This rule advises against the unnecessary use of classes that contain only static members, or nothing. In JavaScript, classes are primarily used for object-oriented programming, where each instance of a class has its own state and behavior. Static members, on the other hand, belong to the class itself and not to any instance of the class. 

When a class contains only static members, it does not make use of JavaScript's object-oriented capabilities, and it can be more difficult to understand, test, and maintain than necessary. In order to avoid this issue, consider using regular functions and variables instead of static class members. This makes your code easier to understand and maintain, and it allows you to make better use of JavaScript's features.

## Non-Compliant Code Examples
```typescript
class Statics {
  static total = 10;

  static doubleTotal() {
    return Statics.total * 2;
  }
}

class DoThing {
  constructor() {
    thing.do();
  }
}

class Useless {}
```

## Compliant Code Examples
```typescript
export const total = 10;

export function doubleTotal() {
  return total * 2;
}

function doThing() {
  return thing.do();
}

class Foo {
  constructor() {
    this.prop = 'prop';
  }

  getProp() {
    return this.prop;
  }
}

class Foo2 {
  constructor() {
    this.prop = 'prop';
  }
}
```
