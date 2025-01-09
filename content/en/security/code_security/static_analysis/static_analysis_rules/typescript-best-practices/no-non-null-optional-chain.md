---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-non-null-optional-chain
- /static_analysis/rules/typescript-best-practices/no-non-null-optional-chain
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Error Prone
  id: typescript-best-practices/no-non-null-optional-chain
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid non-null assertions after an optional chain
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-non-null-optional-chain`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
Using a non-null assertion after an optional chain expression indicates bad type safety. 

## Non-Compliant Code Examples
```typescript
foo?.bar!;
foo?.['bar']!;
foo?.bar()!;
foo.bar?.()!;
(foo?.bar)!.baz;
(foo?.bar)!().baz;
(foo?.bar)!;
(foo?.bar)!();
(foo?.bar!);
(foo?.bar!)();
```

## Compliant Code Examples
```typescript
foo.bar!;
foo.bar!.baz;
foo.bar!.baz();
foo.bar()!;
foo.bar()!();
foo.bar()!.baz;
foo?.bar;
foo?.bar();
(foo?.bar).baz!;
(foo?.bar()).baz!;
foo?.bar!.baz;
foo?.bar!();
foo?.['bar']!.baz;
```
