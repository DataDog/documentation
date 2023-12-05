---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/ambiguous-variable-name
  language: Python
  severity: Notice
title: make sure variable names are readable
---
## Metadata
**ID:** `python-best-practices/ambiguous-variable-name`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
In some fonts, some characters are indistinguishable from the numerals one and zero, such as, O looks like a zero. Use characters that are not ambiguous.

## Non-Compliant Code Examples
```python
I = 1  # use i instead
```

## Compliant Code Examples
```python
def i():
    pass
```
