---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/ban-types
- /static_analysis/rules/typescript-best-practices/ban-types
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/ban-types
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid certain types
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/ban-types`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Some types have several ways to be defined, and some others could be dangerous. This rule suggests a consistent use of types.

## Non-Compliant Code Examples
```typescript
// use lower-case primitives for consistency
const str: String = 'foo';
const bool: Boolean = true;
const num: Number = 1;
const symb: Symbol = Symbol('foo');
const bigInt: BigInt = 1n;

// use a proper function type
const func: Function = () => 1;

// use safer object types
const lowerObj: Object = {};
const capitalObj: Object = { a: 'string' };

const curly1: {} = 1;
const curly2: {} = { a: 'string' };
```

## Compliant Code Examples
```typescript
// use lower-case primitives for consistency
const str: string = 'foo';
const bool: boolean = true;
const num: number = 1;
const symb: symbol = Symbol('foo');
const bigInt: bigint = 1n;

// use a proper function type
const func: () => number = () => 1;

// use safer object types
const lowerObj: object = {};
const capitalObj: { a: string } = { a: 'string' };

const curly1: number = 1;
const curly2: Record<'a', string> = { a: 'string' };
```
