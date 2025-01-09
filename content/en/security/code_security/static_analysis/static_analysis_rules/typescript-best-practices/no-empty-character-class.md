---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/no-empty-character-class
- /static_analysis/rules/typescript-best-practices/no-empty-character-class
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/no-empty-character-class
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Avoid empty character classes in regular expressions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/no-empty-character-class`

**Language:** TypeScript

**Severity:** Error

**Category:** Best Practices

## Description
In regular expressions, empty character classes do not match anything, and were likely used in error.

## Non-Compliant Code Examples
```typescript
var foo = /^abc[]/;
var foo = /foo[]bar/;
if (foo.match(/^abc[]/)) {}
if (/^abc[]/.test(foo)) {}
var foo = /[]]/;
var foo = /\[[]/;
var foo = /\\[\\[\\]a-z[]/;
var foo = /[]]/d;
```

## Compliant Code Examples
```typescript
var foo = /^abc[a-zA-Z]/;
var regExp = new RegExp("^abc[]");
var foo = /^abc/;
var foo = /[\\[]/;
var foo = /[\\]]/;
var foo = /[a-zA-Z\\[]/;
var foo = /[[]/;
var foo = /[\\[a-z[]]/;
var foo = /[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\^\\$\\|]/g;
var foo = /\\s*:\\s*/gim;
var foo = /[\\]]/uy;
var foo = /[\\]]/s;
var foo = /[\\]]/d;
var foo = /\[]/
```
