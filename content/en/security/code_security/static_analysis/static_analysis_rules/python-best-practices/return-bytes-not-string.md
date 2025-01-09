---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/return-bytes-not-string
- /static_analysis/rules/python-best-practices/return-bytes-not-string
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/return-bytes-not-string
  language: Python
  severity: Notice
  severity_rank: 3
title: __bytes__ method should returns bytes, not string
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
