---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: typescript-code-style/no-useless-empty-export
  language: TypeScript
  severity: Notice
title: Avoid empty exports that don't change anything
---
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
