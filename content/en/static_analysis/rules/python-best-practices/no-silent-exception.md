---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-silent-exception
  language: Python
  severity: Error
title: Do not ignore Exception with a pass statement
---
## Metadata
**ID:** `python-best-practices/no-silent-exception`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Using the `pass` statement in an exception block ignores the exception. Exceptions should never be ignored. Instead, the user must add code to notify an exception occurred and attempt to handle it or recover from it.

## Non-Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a /b
except Exception as e:
  pass  # should use a regular statement and not ignore the exception
```

## Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a /b
except ValueError as e:
  print(e)
  pass
```
