---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/self-assignment
  language: Python
  severity: Notice
title: do not assign to itself
---
## Metadata
**ID:** `python-best-practices/self-assignment`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Do not assign a value to itself. Instead, assign the value to a different variable to make the data flow clear to read and understand.

## Non-Compliant Code Examples
```python
def foo():
	bar = bar  # avoid self assignment
```

## Compliant Code Examples
```python
def foo():
	bar = baz
```
