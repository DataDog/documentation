---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/no-duplicate-base-class
  language: Python
  severity: Warning
title: use a base class only once
---
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
class MyClassTwo(SuperClass, SuperClass):
    pass
```

## Compliant Code Examples
```python
class MyClass:
    pass


class MyClassTwo(SuperClass):
    pass
```
