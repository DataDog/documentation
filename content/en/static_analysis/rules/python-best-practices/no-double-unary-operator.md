---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-double-unary-operator
  language: Python
  severity: Error
title: do not use operator -- and ++
---
## Metadata
**ID:** `python-best-practices/no-double-unary-operator`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Operator `--` and `++` do not exists in Python. Increment or decrement the variable appropriately.

## Non-Compliant Code Examples
```python
--n  # use n = n - 1
++n  # use n = n + 1

```

## Compliant Code Examples
```python
n = n + 1
n = n - 1
```
