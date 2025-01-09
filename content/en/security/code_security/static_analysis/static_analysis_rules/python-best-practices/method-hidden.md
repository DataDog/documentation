---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/method-hidden
- /static_analysis/rules/python-best-practices/method-hidden
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/method-hidden
  language: Python
  severity: Warning
  severity_rank: 2
title: a method has the same name than an attribute
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
