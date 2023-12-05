---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-generic-exception
  language: Python
  severity: Warning
title: Do not use generic exceptions
---
## Metadata
**ID:** `python-best-practices/no-generic-exception`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
The specific error must be raised, not a generic `Exception`. Use the exact exception(s) you want to handle and have a recovery handler for each exception that your program may raise.

#### Learn More

 - [Avoid using `except Exception`](https://jerrynsh.com/stop-using-exceptions-like-this-in-python/#3-avoid-using-except-exception)

## Non-Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a /b
except Exception as e:
  pass
```

## Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a /b
except ValueError as e:
  pass
```
