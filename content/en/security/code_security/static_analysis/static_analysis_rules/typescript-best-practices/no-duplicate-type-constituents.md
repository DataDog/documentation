---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-duplicate-type-constituents
- /static_analysis/rules/typescript-best-practices/no-duplicate-type-constituents
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-duplicate-type-constituents
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid duplicate constituents of unions or intersections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-duplicate-type-constituents`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Union and intersection types could duplicate each other. Duplicate values make the code harder to read and are usually not expected.

## Non-Compliant Code Examples
```typescript
type A = 1 | 1;
type B = true & true;
type C = null | null;
type D = any | any;
type E = { a: string | string };
type F = { a: string } | { a: string };
type G = { a: string; b: number } | { a: string; b: number };
type H = Set<string> | Set<string>;
type ActuallyDuplicated = IsArray<number> | IsArray<string>;
type I = Class<string> | Class<string>;
type J = string[] | string[];
type K = string[][] | string[][];
type L = [1, 2, 3] | [1, 2, 3];
type M = () => string | string;
type N = () => null | null;
type O = (arg: string | string) => void;
type P = 'A' | 'A';
type S = A | A;
type T = A | /* comment */ A;
type U = A | B | A;
type V = A | B | A | B;
type W = A | B | A | A;
type X = A | B | A | C;
type Y = (A | B) | (A | B);
type Z = A | (A | A);
type AA = (A | B) | (A | B) | ((C | D) & (A | B)) | (A | B);
type BB = Record<string, A | A>;

```

## Compliant Code Examples
```typescript
type A = 1 | 2;
type B = 1 | '1';
type C = true & boolean;
type D = null | undefined;
type E = any | unknown;
type F = { a: string } | { b: string };
type G = { a: string; b: number } | { b: number; a: string };
type H = { a: string | number };
type I = Set<string> | Set<number>;
type J = Class<string> | Class<number>;
type K = string[] | number[];
type L = string[][] | string[];
type M = [1, 2, 3] | [1, 2, 4];
type N = [1, 2, 3] | [1, 2, 3, 4];
type O = 'A' | string[];
type P = (() => string) | (() => void);
type Q = () => string | void;
type R = () => null | undefined;
type S = (arg: string | number) => void;

type T = 'A';
type U = 'B';
type V = A | B;

type W = 'A';
type X = 'B';
const a: A | B = 'A';

type Y = 'A';
type Z = 'B';
type AA = A | /* comment */ B;

type BB = 'A';
type CC = 'B';
type DD = 'A' | 'B';

type EE = 'A';
type FF = 'B';
type GG = 'C';
type HH = A | B | C;

type JJ = 'A';
type KK = 'B';
type LL = 'C';
type MM = 'D';
type NN = (A | B) | (C | D);

type OO = 'A';
type PP = 'B';
type QQ = (A | B) | (A & B);

type RR = 'A';
type SS = 'B';
type TT = Record<string, A | B>;
```
