---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/os-environ-no-assign
  language: Python
  severity: Error
title: assigning to os.environ does not clear the environment
---
## Metadata
**ID:** `python-best-practices/os-environ-no-assign`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
Assigning to `os.environ` does not clear the environment. To clear the environment, use `os.environ.clear()`

## Non-Compliant Code Examples
```python
import os

os.environ = {}  # use os.environ.clear
```

## Compliant Code Examples
```python
import os

os.environ.clear()

```
