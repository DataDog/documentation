---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-best-practices/no-non-null-optional-chain
  language: TypeScript
  severity: Warning
title: Avoid non-null assertions after an optional chain
---
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
