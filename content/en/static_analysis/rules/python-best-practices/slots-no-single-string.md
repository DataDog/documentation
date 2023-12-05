---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/slots-no-single-string
  language: Python
  severity: Error
title: __slots__ should not be a single string
---
## Metadata
**ID:** `python-best-practices/slots-no-single-string`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
The `__slots__` attribute must be a non-string iterable.

#### Learn More

 - [Python Wiki: Using slots](https://wiki.python.org/moin/UsingSlots)

## Non-Compliant Code Examples
```python
class MyClass:
    __slots__ = "attr"  # should be an iterable

    def __init__(self):
        pass
```

## Compliant Code Examples
```python
from django.apps import AppConfig


class TweetsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tweets'
```

```python
class MyClass:
    __slots__ = ("attr", )

    def __init__(self):
        pass
```
