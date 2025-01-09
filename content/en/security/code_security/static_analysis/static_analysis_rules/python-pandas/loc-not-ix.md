---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/loc-not-ix
- /static_analysis/rules/python-pandas/loc-not-ix
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/loc-not-ix
  language: Python
  severity: Info
  severity_rank: 4
title: prefer iloc or loc rather than ix
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/loc-not-ix`

**Language:** Python

**Severity:** Info

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
