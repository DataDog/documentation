---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/loc-not-ix
  language: Python
  severity: None
title: prefer iloc or loc rather than ix
---
## Metadata
**ID:** `python-pandas/loc-not-ix`

**Language:** Python

**Severity:** None

**Category:** Best Practices

## Description
The functions `notna` and `notnull` are similar. However, this is a best practice to use `notna` since other methods use the same naming patterns.

## Non-Compliant Code Examples
```python
index = df.iat[:, 1:3]
```

```python
index = df.at[:, ['B', 'A']]
```

```python
s = df.ix[[0, 2], 'A']
```

## Compliant Code Examples
```python
new_df = df.iloc[]
```
