---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/equal-basic-types
  language: Python
  severity: Warning
title: check equal is used on consistent basic types
---
## Metadata
**ID:** `python-best-practices/equal-basic-types`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
When comparing basic types (string, integer, float), we should always values of the same types.

## Non-Compliant Code Examples
```python
1 == "1"  # Comparing an integer and a string
1.0 == "foo"  # Comparing a float and a string
```

## Compliant Code Examples
```python
1 == 1
"abc" == "def"
a == 1
a == b
```
