---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-extra-non-null-assertion
- /static_analysis/rules/typescript-best-practices/no-extra-non-null-assertion
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-extra-non-null-assertion
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid extra non-null assertions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-extra-non-null-assertion`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
The non `null` or `undefined` assertion operation should not be used twice in a single expression.

## Non-Compliant Code Examples
```typescript
const bar = foo!!.bar;
function foo(bar: number | undefined) { const bar: number = bar!!; }
function foo(bar?: { n: number }) { return bar!?.n; }
function foo(bar?: { n: number }) { return bar!?.(); }

// parentheses
const foo: { bar: number } | null = null; const bar = (foo!)!.bar;
function foo(bar?: { n: number }) { return (bar!)?.n; }
function foo(bar?: { n: number }) { return (bar)!?.n; }
function foo(bar?: { n: number }) { return (bar!)?.(); }
```

## Compliant Code Examples
```typescript
const bar = foo!.bar;

function foo(bar: number | undefined) {
  const bar: number = bar!;
}

function foo(bar?: { n: number }) {
  return bar?.n;
}

// https://github.com/typescript-eslint/typescript-eslint/issues/2166
checksCounter?.textContent!.trim();

// https://github.com/typescript-eslint/typescript-eslint/issues/2732
function foo(key: string | null) {
  const obj = {};
  return obj?.[key!];
}
```
