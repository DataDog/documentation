---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: typescript-code-style/no-div-regex
  language: TypeScript
  severity: Notice
title: Avoid equal signs explicitly at the beginning of regex
---
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
