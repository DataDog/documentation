---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/no-empty-array-as-parameter
  language: Python
  severity: Warning
title: Do not use empty array as default parameter
---
## Metadata
**ID:** `python-security/no-empty-array-as-parameter`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
We should never pass an empty array parameter to a function. Instead, use `None` and check the value if defined. This can cause unwanted behavior as the value of the argument is only evaluated once.

**Read more**

 - [Avoid using empty list as default argument](https://nikos7am.com/posts/mutable-default-arguments/)

## Non-Compliant Code Examples
```python
def newFunction(arg1, arg2: int, arg3 = [], arg4: MyType = []):  # do not use empty array/list as default parameter
  print("bla")
```

## Compliant Code Examples
```python
def newFunction(arg1, arg2: int, arg3 = None):  # do not use empty array/list as default parameter
  print("bla")
```
