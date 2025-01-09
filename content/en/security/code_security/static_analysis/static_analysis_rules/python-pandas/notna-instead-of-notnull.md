---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/notna-instead-of-notnull
- /static_analysis/rules/python-pandas/notna-instead-of-notnull
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/notna-instead-of-notnull
  language: Python
  severity: Info
  severity_rank: 4
title: prefer notna to notnull
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/notna-instead-of-notnull`

**Language:** Python

**Severity:** Info

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
