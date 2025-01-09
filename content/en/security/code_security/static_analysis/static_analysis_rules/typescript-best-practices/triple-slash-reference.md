---
aliases:
- /continuous_integration/static_analysis/rules/typescript-best-practices/triple-slash-reference
- /static_analysis/rules/typescript-best-practices/triple-slash-reference
dependencies: []
disable_edit: true
group_id: typescript-best-practices
meta:
  category: Best Practices
  id: typescript-best-practices/triple-slash-reference
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid triple slash in favor of ES6 import declarations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-best-practices/triple-slash-reference`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Use ESM instead of references.

## Non-Compliant Code Examples
```typescript
/// <reference path="foo" />
/// <reference types="bar" />
/// <reference lib="baz" />
```

## Compliant Code Examples
```typescript
import * as foo from 'foo';
import * as bar from 'bar';
import * as baz from 'baz';
```
