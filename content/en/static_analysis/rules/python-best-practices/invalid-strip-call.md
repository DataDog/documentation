---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/invalid-strip-call
  language: Python
  severity: Notice
title: strip() argument should not have duplicate characters
---
## Metadata
**ID:** `python-best-practices/invalid-strip-call`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
When using `.strip()`, you only need to pass the letters you want to split on. There is no need to specify the same letter twice.

## Non-Compliant Code Examples
```python
"Hello World".strip("Hello")  # letter l is present twice in the string
```

## Compliant Code Examples
```python
"Hello World".strip("Helo")  # letter l is present twice in the string
```
