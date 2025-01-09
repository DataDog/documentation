---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/require-yield
- /static_analysis/rules/typescript-best-practices/require-yield
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/require-yield
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Require yield in generator functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/require-yield`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
Generator functions must yield at some point. Otherwise, use a normal function.

## Non-Compliant Code Examples
```typescript
function* foo() { return 0; }
(function* foo() { return 0; })();
var obj = { *foo() { return 0; } }
class A { *foo() { return 0; } }
function* foo() { function* bar() { yield 0; } }
function* foo() { function* bar() { return 0; } yield 0; }
```

## Compliant Code Examples
```typescript
function foo() { return 0; }
function* foo() { yield 0; }
function* foo() { }
(function* foo() { yield 0; })();
(function* foo() { })();
var obj = { *foo() { yield 0; } };
var obj = { *foo() { } };
class A { *foo() { yield 0; } };
class A { *foo() { } }
```
