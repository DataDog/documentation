---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/import-single-module
  language: Python
  severity: Notice
title: only one module to import per import statement
---
## Metadata
**ID:** `python-best-practices/import-single-module`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Import using the `import` keyword should be done on separate lines.

## Non-Compliant Code Examples
```python
import os, sys  # when using an import statement, import one module at a time
```

## Compliant Code Examples
```python
from collections.abc import Mapping, Sequence
import os
import sys
from typing import Any, NewType
```
