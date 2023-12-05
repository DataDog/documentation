---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/no-assert-on-tuples
  language: Python
  severity: Error
title: no assert on tuples
---
## Metadata
**ID:** `python-best-practices/no-assert-on-tuples`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
Do not assert on tuples. Asserting on tuples will always evaluate to `True` if the tuple is not empty. Instead, assert on each value rather than asserting on a tuple.

## Non-Compliant Code Examples
```python
assert (1, 2)  # do not assert on tuples
```

## Compliant Code Examples
```python
assert x

assert exitcode == 42, (stdout, stderr)
```
