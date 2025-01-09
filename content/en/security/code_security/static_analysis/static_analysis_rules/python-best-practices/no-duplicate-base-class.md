---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-duplicate-base-class
- /static_analysis/rules/python-best-practices/no-duplicate-base-class
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/no-duplicate-base-class
  language: Python
  severity: Warning
  severity_rank: 2
title: use a base class only once
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-duplicate-base-class`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
Classes should not have the same superclass specified twice. Each superclass must be unique.

## Non-Compliant Code Examples
```python
class MyClass:
    pass


# The SuperClass parent is specified twice
class MyClassTwo(SuperClass, OtherClass, SuperClass):
    pass
```

## Compliant Code Examples
```python
class MyClass:
    pass


class MyClassTwo(SuperClass):
    pass
```
