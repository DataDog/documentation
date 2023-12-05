---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/init-call-parent
  language: Python
  severity: Warning
title: use super() to call the parent constructor
---
## Metadata
**ID:** `python-best-practices/init-call-parent`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Calling the parent constructor should be done by calling `super()`, not by calling the parent object directly.

## Non-Compliant Code Examples
```python
class Class(Parent):
    def __init__(self):
        SomeClass.__init__(self)  # should use super()
```

## Compliant Code Examples
```python
# More than one parent, we need to know exactly what
# parent constructor to use
class DummyCIVisibilityWriter(DummyWriterMixin, CIVisibilityWriter):
    def __init__(self, *args, **kwargs):
        CIVisibilityWriter.__init__(self, *args, **kwargs)
        DummyWriterMixin.__init__(self, *args, **kwargs)
        self._encoded = None
```

```python
class Class(Parent):
    def foo(self):
        SomeClass.__init__(self)  # outside of __init__, valid
```

```python
class Class(Parent):
    def __init__(self):
        super().__init__(self)
```
