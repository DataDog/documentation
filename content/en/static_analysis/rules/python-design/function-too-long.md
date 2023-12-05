---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-design/function-too-long
  language: Python
  severity: Warning
title: functions must have less than 100 lines
---
## Metadata
**ID:** `python-design/function-too-long`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Function should be short to be easy to understand and maintain. Functions more of 100 lines trigger a warning and should be refactored into smaller units of code.

## Non-Compliant Code Examples
```python
def myfunc():  # function is too long




































































































  pass
```

## Compliant Code Examples
```python
def myfunc():
  pass
```
