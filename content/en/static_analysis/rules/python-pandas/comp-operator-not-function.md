---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/comp-operator-not-function
  language: Python
  severity: None
title: Use operators to compare values, not functions
---
## Metadata
**ID:** `python-pandas/comp-operator-not-function`

**Language:** Python

**Severity:** None

**Category:** Best Practices

## Description
User should use comparison operators (`<`, `>`,  etc) instead of function (`.ld`) to make the code more clear.

## Non-Compliant Code Examples
```python
foo.le(bar)
```

## Compliant Code Examples
```python
foo < bar
```
