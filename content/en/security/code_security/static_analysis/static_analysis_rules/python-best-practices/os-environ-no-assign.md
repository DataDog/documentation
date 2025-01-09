---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/os-environ-no-assign
- /static_analysis/rules/python-best-practices/os-environ-no-assign
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/os-environ-no-assign
  language: Python
  severity: Error
  severity_rank: 1
title: assigning to os.environ does not clear the environment
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
