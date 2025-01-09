---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-useless-empty-export
- /static_analysis/rules/typescript-code-style/no-useless-empty-export
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Best Practices
  id: typescript-code-style/no-useless-empty-export
  language: TypeScript
  severity: Notice
  severity_rank: 3
title: Avoid empty exports that don't change anything
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-useless-empty-export`

**Language:** TypeScript

**Severity:** Notice

**Category:** Best Practices

## Description
Do not use empty exports.

## Non-Compliant Code Examples
```typescript
export const value = 'Hello, world!';
export {};

import 'some-other-module';
export {};

```

## Compliant Code Examples
```typescript
declare module '_';
import {} from '_';
import * as _ from '_';
export = {};
export = 3;
export const _ = {};

const _ = {};
export default _;

export * from '_';
export = {};

```
