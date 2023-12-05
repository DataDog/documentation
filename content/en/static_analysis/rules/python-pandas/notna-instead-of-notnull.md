---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/notna-instead-of-notnull
  language: Python
  severity: None
title: prefer notna to notnull
---
## Metadata
**ID:** `python-pandas/notna-instead-of-notnull`

**Language:** Python

**Severity:** None

**Category:** Best Practices

## Description
The functions `notna` and `notnull` are similar. However, this is a best practice to use `notna` since other methods use the same naming patterns.

## Non-Compliant Code Examples
```python
notnulls = pd.notnull(val)
```

## Compliant Code Examples
```python
notnas = pd.notna(val)
```
