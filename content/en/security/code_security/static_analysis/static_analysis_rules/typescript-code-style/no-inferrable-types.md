---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-inferrable-types
- /static_analysis/rules/typescript-code-style/no-inferrable-types
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Best Practices
  id: typescript-code-style/no-inferrable-types
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid explicit type declarations for variables and params
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-inferrable-types`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
When you set an initial primitive value to a TypeScript parameter, property, or variable their respective type can be inferred. Explicitly adding type annotations in some cases can make your code more verbose and prevent TypeScript from inferring a more specific literal type.

## Non-Compliant Code Examples
```typescript
const a: bigint = 10n;
const a: bigint = -10n;
const a: bigint = BigInt(10);
const a: bigint = -BigInt(10);
const a: bigint = BigInt?.(10);
const a: bigint = -BigInt?.(10);
const a: boolean = false;
const a: boolean = true;
const a: boolean = Boolean(null);
const a: boolean = Boolean?.(null);
const a: boolean = !0;
const a: number = 10;
const a: number = +10;
const a: number = -10;
const a: number = Number("1");
const a: number = +Number("1");
const a: number = -Number("1");
const a: number = Number?.("1");
const a: number = +Number?.("1");
const a: number = -Number?.("1");
const a: number = Infinity;
const a: number = +Infinity;
const a: number = -Infinity;
const a: number = NaN;
const a: number = +NaN;
const a: number = -NaN;
const a: null = null;
const a: RegExp = /a/;
const a: RegExp = RegExp("a");
const a: RegExp = RegExp?.("a");
const a: RegExp = new RegExp("a");
const a: string = "str";
const a: string = 'str';
const a: string = `str`;
const a: string = String(1);
const a: string = String?.(1);
const a: symbol = Symbol("a");
const a: symbol = Symbol?.("a");
const a: undefined = undefined;
const a: undefined = void someValue;

```

## Compliant Code Examples
```typescript
const a = 10n;
const a = -10n;
const a = BigInt(10);
const a = -BigInt(10);
const a = BigInt?.(10);
const a = -BigInt?.(10);
const a = false;
const a = true;
const a = Boolean(null);
const a = Boolean?.(null);
const a = !0;
const a = 10;
const a = +10;
const a = -10;
const a = Number("1");
const a = +Number("1");
const a = -Number("1");
const a = Number?.("1");
const a = +Number?.("1");
const a = -Number?.("1");
const a = Infinity;
const a = +Infinity;
const a = -Infinity;
const a = NaN;
const a = +NaN;
const a = -NaN;
const a = null;
const a = /a/;
const a = RegExp("a");
const a = RegExp?.("a");
const a = new RegExp("a");
const a = "str";
const a = 'str';
const a = `str`;
const a = String(1);
const a = String?.(1);
const a = Symbol("a");
const a = Symbol?.("a");
const a = undefined;
const a = void someValue;
```
