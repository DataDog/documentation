---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/use-read-csv-not-read-table
- /static_analysis/rules/python-pandas/use-read-csv-not-read-table
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/use-read-csv-not-read-table
  language: Python
  severity: Info
  severity_rank: 4
title: prefer read_csv to read_table
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/use-read-csv-not-read-table`

**Language:** Python

**Severity:** Info

**Category:** Best Practices

## Description
The functions `notna` and `notnull` are similar. However, this is a best practice to use `notna` since other methods use the same naming patterns.

## Non-Compliant Code Examples
```python
employees = pd.read_table(input_file)
```

## Compliant Code Examples
```python
employees = pd.read_csv(input_file)
```
