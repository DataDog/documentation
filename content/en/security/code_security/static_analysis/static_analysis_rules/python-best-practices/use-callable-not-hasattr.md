---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/use-callable-not-hasattr
- /static_analysis/rules/python-best-practices/use-callable-not-hasattr
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/use-callable-not-hasattr
  language: Python
  severity: Notice
  severity_rank: 3
title: do not use hasattr to check if a value is callable
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
