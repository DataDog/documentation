---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/exception-inherit
- /static_analysis/rules/python-best-practices/exception-inherit
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/exception-inherit
  language: Python
  severity: Warning
  severity_rank: 2
title: ensure exception inherit a base exception
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
