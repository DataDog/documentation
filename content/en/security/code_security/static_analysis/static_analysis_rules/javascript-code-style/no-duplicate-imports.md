---
aliases:
- /continuous_integration/static_analysis/rules/javascript-code-style/no-duplicate-imports
- /static_analysis/rules/javascript-code-style/no-duplicate-imports
dependencies: []
disable_edit: true
group_id: javascript-code-style
meta:
  category: Best Practices
  id: javascript-code-style/no-duplicate-imports
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid duplicate module imports
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `javascript-code-style/no-duplicate-imports`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
Single imports are easier to read and maintain you can see everything being imported from a module in one line.

## Non-Compliant Code Examples
```javascript
import { merge } from 'module';
import something from 'another-module';
import { find } from 'module';

import something from 'something';
import { find } from 'something';
```

## Compliant Code Examples
```javascript
import { merge, find } from 'module';
import something from 'another-module';

// not mergeable
import { merge } from 'something';
import * as something from 'something';
```
