---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-best-practices/no-if-true
  language: Python
  severity: Notice
title: do not compare to True in a condition
---
## Metadata
**ID:** `python-best-practices/no-if-true`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Do not use `variable == True`, just use `variable`. Comparing against `True` makes the code more complicated to read.

## Non-Compliant Code Examples
```python
if foo == True:  # just used if foo
  print("bar")
```

## Compliant Code Examples
```python
if foo:
  print("bar")
```
