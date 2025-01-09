---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-div-regex
- /static_analysis/rules/typescript-code-style/no-div-regex
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Error Prone
  id: typescript-code-style/no-div-regex
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid equal signs explicitly at the beginning of regex
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-div-regex`

**Language:** TypeScript

**Severity:** Notice

**Category:** Error Prone

## Description
At the start of a regular expression literal, the characters `/=` can be mistaken for a division assignment operator.

## Non-Compliant Code Examples
```typescript
var f = function() { return /=foo/; };
```

## Compliant Code Examples
```typescript
var f = function() { return /foo/ig.test('bar'); };
var f = function() { return /\\=foo/; };
```
