---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/function-already-exists
- /static_analysis/rules/python-best-practices/function-already-exists
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/function-already-exists
  language: Python
  severity: Error
  severity_rank: 1
title: a function must be defined only once
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
