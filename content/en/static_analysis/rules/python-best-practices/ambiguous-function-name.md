---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/ambiguous-function-name
  language: Python
  severity: Notice
title: make sure function names are readable
---
## Metadata
**ID:** `python-best-practices/ambiguous-function-name`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
In some fonts, these characters are indistinguishable from the numerals one and zero. Use characters that are not ambiguous.

## Non-Compliant Code Examples
```python
def I():  # use i instead
    pass
```

## Compliant Code Examples
```python
def i():
    pass
```
