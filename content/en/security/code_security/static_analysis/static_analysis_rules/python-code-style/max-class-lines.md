---
aliases:
- /continuous_integration/static_analysis/rules/python-code-style/max-class-lines
- /static_analysis/rules/python-code-style/max-class-lines
dependencies: []
disable_edit: true
group_id: python-code-style
meta:
  category: Code Style
  id: python-code-style/max-class-lines
  language: Python
  severity: Warning
  severity_rank: 2
title: classes must be less than 900 lines
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-code-style/max-class-lines`

**Language:** Python

**Severity:** Warning

**Category:** Code Style

## Description
This rule stipulates that Python classes should not exceed 900 lines of code. The purpose of this rule is to maintain readability and maintainability of the code. Large classes can often become difficult to understand and maintain, leading to bugs and inefficiencies. 

Adhering to this rule is crucial in promoting clean code and efficient software development. It encourages developers to practice modularity in their code, breaking down complex problems into smaller, manageable parts. 

To avoid violating this rule, it is good practice to break down large classes into smaller ones, each with a single, clear responsibility. If a class is growing too large, consider whether some of its functionality could be better handled by a new class. Using inheritance or composition can also help reduce the size of individual classes. For instance, if `MyClass` is too large, you might create a new class `MySubClass` and have `MyClass` inherit from it: 
``` 
class MySubClass:
    def foo(self):
        pass

class MyClass(MySubClass):
    def __init__(self):
        pass
```
Remember, the goal is to write code that is easy to read, understand, and maintain.

## Arguments

 * `max-lines`: Maximum number of lines. Default: 100.

## Compliant Code Examples
```python
class MyClass:
    def __init__(self):
        pass

    def foo(self):
        pass
```
