---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-code-style/max-class-lines
  language: Python
  severity: Warning
title: classes must be less than 100 lines
---
## Metadata
**ID:** `python-code-style/max-class-lines`

**Language:** Python

**Severity:** Warning

**Category:** Code Style

## Description
A class must stay short (less than 100 lines) to be easy to understand. If your class or function is more than 100 lines, you should refactor your code and ensure that your class is less than 100 lines.

## Non-Compliant Code Examples
```python
class MyClass:
    def __init__(self):
        pass

































































































    def foo(self):
        pass
```

## Compliant Code Examples
```python
class MyClass:
    def __init__(self):
        pass

    def foo(self):
        pass
```
