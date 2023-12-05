---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/use-callable-not-hasattr
  language: Python
  severity: Notice
title: do not use hasattr to check if a value is callable
---
## Metadata
**ID:** `python-best-practices/use-callable-not-hasattr`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Do not make any check using `hasattr` to check if a function is callable since the object may have redefine `__getattr__`. Instead, use `callable()`.

#### Learn More

 - [Python Documentation: callable() built-in](https://docs.python.org/3/library/functions.html#callable)

## Non-Compliant Code Examples
```python
hasattr(x, '__call__')  # use callable 
```

## Compliant Code Examples
```python
callable(x)
```
