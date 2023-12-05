---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/static-method-no-self
  language: Python
  severity: Error
title: do not use self as parameter for static methods
---
## Metadata
**ID:** `python-best-practices/static-method-no-self`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
A static method makes no use of an instance. Therefore, the `self` argument is not needed nor useful and should not be used.

## Non-Compliant Code Examples
```python
class Foo:
  @staticmethod
  def foo(self, bar):  # no need to use the self argument with a @staticmethod
     pass
```

## Compliant Code Examples
```python
class Foo:
  @staticmethod
  def foo(bar):
     pass
```
