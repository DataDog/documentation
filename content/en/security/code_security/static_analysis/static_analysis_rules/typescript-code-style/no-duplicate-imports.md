---
aliases:
- /continuous_integration/static_analysis/rules/typescript-code-style/no-duplicate-imports
- /static_analysis/rules/typescript-code-style/no-duplicate-imports
dependencies: []
disable_edit: true
group_id: typescript-code-style
meta:
  category: Best Practices
  id: typescript-code-style/no-duplicate-imports
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid duplicate module imports
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-code-style/no-duplicate-imports`

**Language:** TypeScript

**Severity:** Warning

**Category:** Best Practices

## Description
Single imports are easier to read and maintain you can see everything being imported from a module in one line.

## Non-Compliant Code Examples
```typescript
import type { merge } from 'module';
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';
import type { merge } from 'module';
```

```typescript
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';

import something from 'something';
import { find } from 'something';
```

## Compliant Code Examples
```typescript
import type { MaybePromise } from '@datadog-vscode/common/utils';
import { asyncMap } from '@datadog-vscode/common/utils';
```

```typescript
import { merge, find } from 'module';
import something from 'another-module';

// not mergeable
import { merge } from 'something';
import * as something from 'something';
```
