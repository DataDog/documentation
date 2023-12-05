---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/isna-instead-of-isnull
  language: Python
  severity: Notice
title: Use isna instead of isnull
---
## Metadata
**ID:** `python-pandas/isna-instead-of-isnull`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
The functions `isna` and `isnull` are similar. However, this is a best practice to use `isna` since other methods use the same naming patterns.

#### Learn More

 - [Pandas isna() and isnull(), what is the difference?](https://stackoverflow.com/questions/52086574/pandas-isna-and-isnull-what-is-the-difference)

## Non-Compliant Code Examples
```python
nulls = pd.isnull(val)  # prefer using isna
```

## Compliant Code Examples
```python
nas = pd.isna(val)
```
