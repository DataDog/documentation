---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/function-already-exists
  language: Python
  severity: Error
title: a function must be defined only once
---
## Metadata
**ID:** `python-best-practices/function-already-exists`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
A function should only be defined once. Make sure you use unique name for each function in a module.

## Non-Compliant Code Examples
```python

def my_function():
  pass

def foo():
  pass

def my_function(): # function already defined
  pass

```

## Compliant Code Examples
```python

def my_function():
  pass

def foo():
  pass

def my_other_function():
  pass

```
