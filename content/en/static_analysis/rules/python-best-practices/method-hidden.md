---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/method-hidden
  language: Python
  severity: Warning
title: a method has the same name than an attribute
---
## Metadata
**ID:** `python-best-practices/method-hidden`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
Make sure that class attribute and class methods have a unique name without any collision.

## Non-Compliant Code Examples
```python
class MyClass:
    def __init__(self, something):
        self.foo = something

    def bla(foo):
        pass

    def foo(self): # hidden by self.foo
        pass
```

## Compliant Code Examples
```python
class MyClass:
    def __init__(self, something):
        self.foo = something

    def bla(foo):
        pass

    def bar(self): # hidden by self.foo
        pass
```
