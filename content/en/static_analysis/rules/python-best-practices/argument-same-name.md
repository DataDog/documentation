---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/argument-same-name
  language: Python
  severity: Error
title: do not have arguments with the same name
---
## Metadata
**ID:** `python-best-practices/argument-same-name`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
Function parameters cannot have the same name. Each function parameter must have a distinct name.

## Non-Compliant Code Examples
```python
def foo(bar, bar: int):  # use another name for the second argument
	pass
```

## Compliant Code Examples
```python
def foo(bar, baz):
	pass
```
