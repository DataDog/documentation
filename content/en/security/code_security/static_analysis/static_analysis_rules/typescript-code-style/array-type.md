---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/array-type
- /static_analysis/rules/typescript-code-style/array-type
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Code Style
  id: typescript-code-style/array-type
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Require consistently using either T[] or Array<T> for arrays
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/array-type`

**Language:** TypeScript

**Severity:** Notice

**Category:** Code Style

## Description
Chose between: `T[]` and `Array<T>`. These types are equivalent and it should be consistent across the code base.

## Non-Compliant Code Examples
```typescript
// Base cases from https://github.com/typescript-eslint/typescript-eslint/issues/2323#issuecomment-663977655
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: ReadonlyArray<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: ReadonlyArray<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: ReadonlyArray<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: ReadonlyArray<string | number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<number> = [];
let a: Array<number> = [];
let a: Array<string | number> = [];
let a: ReadonlyArray<string | number> = [];
let a: ReadonlyArray<bigint> = [];

// End of base cases
type Arr<T> = Array<T>;
let a: Array<{ foo: Array<Bar> }> = [];
let a: Array<{ foo: Foo | Array<Bar> }> = [];
let ya = [[1, '2']] as Array<[number, string]>;
// Ignore user-defined aliases
let yyyy: Arr<Array<Array<Arr<string>>>> = [[[['2']]]];
interface ArrayClass<T> {
  foo: T[];
  bar: T[];
  baz: Arr<T>;
  xyz: this[];
}
function barFunction(bar: Array<ArrayClass<String>>) {
  return bar.map(e => e.bar);
}
let barVar: Array<(c: number) => number> = [];
type barUnion = Array<string | number | boolean>;
type barIntersection = Array<string & number>;
let w: Array<fooName.BazType<string>> = [['baz']];
type Unwrap<T> = T extends Array<infer E> ? E : T;
```

## Compliant Code Examples
```typescript
// Base cases from https://github.com/typescript-eslint/typescript-eslint/issues/2323#issuecomment-663977655
let a: number[] = [];
let a: (string | number)[] = [];
let a: readonly number[] = [];
let a: readonly (string | number)[] = [];
let a: number[] = [];
let a: (string | number)[] = [];
let a: readonly number[] = [];
let a: readonly (string | number)[] = [];
let a: number[] = [];
let a: (string | number)[] = [];
let a: readonly number[] = [];
let a: number[] = [];
let a: (string | number)[] = [];
let a: number[] = [];
let a: readonly number[] = [];
let a: number[] = [];
let a: readonly number[] = [];
let a: readonly (string | number)[] = [];
let a: number[] = [];
let a: readonly number[] = [];
let a: readonly number[] = [];
let a: readonly (string | number)[] = [];
let a: readonly bigint[] = [];

// End of base cases
let a = new Array();
let a: { foo: Bar[] }[] = [];
let yy: number[][] = [[4, 5], [6]];
function bazFunction(baz: Arr<ArrayClass<String>>) { return baz.map(e => e.baz); }
namespace fooName { type BarType = { bar: string }; type BazType<T> = Arr<T>; }
interface FooInterface { '.bar': { baz: string[] }; }
let yy: number[][] = [[4, 5], [6]];
let ya = [[1, '2']] as [number, string][];
function barFunction(bar: ArrayClass<String>[]) { return bar.map(e => e.bar); }
function bazFunction(baz: Arr<ArrayClass<String>>) { return baz.map(e => e.baz); }
let barVar: ((c: number) => number)[];
type barUnion = (string | number | boolean)[];
type barIntersection = (string & number)[];
interface FooInterface { '.bar': { baz: string[] }; }
type Unwrap<T> = T extends (infer E)[] ? E : T;
function bazFunction(baz: Arr<ArrayClass<String>>) { return baz.map(e => e.baz); }

```
