---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/ctx-manager-enter-exit-defined
  language: Python
  severity: Error
title: ensure that both __exit__ and __enter__ are defined
---
## Metadata
**ID:** `python-best-practices/ctx-manager-enter-exit-defined`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Methods `__enter__` and `__exit__` must be declared together. If one method is missing, we should make sure both are defined.

#### Learn More

 - [contextlib documentation](https://docs.python.org/3/library/contextlib.html)

## Non-Compliant Code Examples
```python
class Ctx:
    def __exit__(self, *exc):  # the method __enter__ should be defined.
        pass
```

```python
class Ctx:
    def __enter__(self):  # the method __exit__ should also be defined.
        pass
```

## Compliant Code Examples
```python
class Ctx:
    def __enter__(self):
        pass
    def __exit__(self, *exc):
        pass
```
