---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/return-bytes-not-string
  language: Python
  severity: Notice
title: __bytes__ method should returns bytes, not string
---
## Metadata
**ID:** `python-best-practices/return-bytes-not-string`

**Language:** Python

**Severity:** Notice

**Category:** Error Prone

## Description
The `__bytes__` method should not return a string and instead, ensure to return bytes.

## Non-Compliant Code Examples
```python
class MyClass:
    def __bytes__(self):
        pass
        return "123" # should return b"123"
```

## Compliant Code Examples
```python
class MyClass:
    def __bytes__(self):
        pass
        return b"123"
```
