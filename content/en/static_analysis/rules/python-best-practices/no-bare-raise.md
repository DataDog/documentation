---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-bare-raise
  language: Python
  severity: Warning
title: Do not use a raise statement without a specific exception
---
## Metadata
**ID:** `python-best-practices/no-bare-raise`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Never use a bare raise and always use a specific exception. Using a specific exception helps you distinguish errors in your program and have appropriate error handling code.

## Non-Compliant Code Examples
```python
def myfunc():
  raise  # should use specific exception

if foo:
  raise
else:
  func1()
  raise

for v in list:
  do_something()
  raise
```

## Compliant Code Examples
```python
def myfunc():
  raise MyException

try:
  foo()
except MyException:
  raise  # re-raise exception
```
