---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-empty-pattern
- /static_analysis/rules/typescript-best-practices/no-empty-pattern
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-empty-pattern
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid empty destructuring patterns
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-empty-pattern`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
An empty destructuring pattern doesn't provide any value and might be confusing, as it looks similar to the default assignment.

## Non-Compliant Code Examples
```typescript
var {} = foo
var [] = foo
var {a: {}} = foo
var {a, b: {}} = foo
var {a: []} = foo
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

## Compliant Code Examples
```typescript
var {a = {}} = foo;
var {a, b = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
var [a] = foo
```
