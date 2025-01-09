---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-unnecessary-type-constraint
- /static_analysis/rules/typescript-best-practices/no-unnecessary-type-constraint
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-unnecessary-type-constraint
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid unnecessary constraints on generic types
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-unnecessary-type-constraint`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
It is redundant to `extend` from `any` or `unknown`.

## Non-Compliant Code Examples
```typescript
function data<T extends any>() {}
function data<T extends any, U>() {}
function data<T, U extends any>() {}
function data<T extends any, U extends T>() {}
const data = <T extends any>() => {};
const data = <T extends any>() => {};
const data = <T extends any>() => {};
const data = <T extends any,>() => {};
const data = <T extends any, >() => {};
const data = <T extends any ,>() => {};
const data = <T extends any , >() => {};
const data = <T extends any = unknown>() => {};
const data = <T extends any, U extends any>() => {};
function data<T extends unknown>() {}
const data = <T extends any>() => {};
const data = <T extends unknown>() => {};
class Data<T extends unknown> {}
const Data = class<T extends unknown> {};

class Data {
  member<T extends unknown>() {}
}

const Data = class {
  member<T extends unknown>() {}
};

interface Data<T extends unknown> {}
type Data<T extends unknown> = {};
```

## Compliant Code Examples
```typescript
function data() {}
function data<T>() {}
function data<T, U>() {}
function data<T extends number>() {}
function data<T extends number | string>() {}
function data<T extends any | number>() {}

type TODO = any;
function data<T extends TODO>() {}

const data = () => {};
const data = <T>() => {};
const data = <T, U>() => {};
const data = <T extends number>() => {};
const data = <T extends number | string>() => {};
```
