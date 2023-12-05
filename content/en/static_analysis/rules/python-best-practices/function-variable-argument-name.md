---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/function-variable-argument-name
  language: Python
  severity: Warning
title: Do not assign to function arguments
---
## Metadata
**ID:** `python-best-practices/function-variable-argument-name`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
A function parameter should only be read and not be modified. If your intent is to modify the value of the parameter, return the value in the function and handle the new value in the caller of the function.

## Non-Compliant Code Examples
```python
def func(arg1, arg2):
	arg1 = foo  # assign to a variable that is an argument
```

```python
def func(arg1, arg2):
	(arg1, arg3, arg2) = foo  # assign to a variable that is an argument
```

## Compliant Code Examples
```python
def func(arg1, arg2):
	arg3 = foo
```
