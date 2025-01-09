---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-empty-interface
- /static_analysis/rules/typescript-code-style/no-empty-interface
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Best Practices
  id: typescript-code-style/no-empty-interface
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid the declaration of empty interfaces
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-empty-interface`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Do not use empty interfaces.

## Non-Compliant Code Examples
```typescript
interface Foo {}
interface Foo extends {}
interface Bar extends Foo {}
interface Foo extends Array<number> {}
interface Foo extends Array<number | {}> {}
interface Foo extends Array<Bar> {}
interface Foo extends R {}
interface Foo<T> extends Bar<T> {}
declare module FooBar { type Baz = typeof baz; export interface Bar extends Baz {} }
interface Foo {

}
```

## Compliant Code Examples
```typescript
interface Foo { name: string; }
interface Foo { name: string; }
interface Bar { age: number; }

// valid because extending multiple interfaces can be used instead of a union type
interface Baz extends Foo, Bar {}
interface Foo { name: string; }
interface Foo { props: string; }
class Bar {}
```
