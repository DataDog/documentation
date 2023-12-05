---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: javascript-code-style/no-duplicate-imports
  language: JavaScript
  severity: Warning
title: Avoid duplicate module imports
---
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
