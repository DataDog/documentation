---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/exception-inherit
  language: Python
  severity: Warning
title: ensure exception inherit a base exception
---
## Metadata
**ID:** `python-best-practices/exception-inherit`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
New `Exception` must inherit the base `Exception`. Always use another exception as parent or use at least the `Exception` base class.

#### Learn More

- [Python Documentation: User-defined Exceptions](https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions)

## Non-Compliant Code Examples
```python
class CustomException:
    """An Invalid exception class."""
```

## Compliant Code Examples
```python
class CustomException(Exception):
    """An Invalid exception class."""
```
