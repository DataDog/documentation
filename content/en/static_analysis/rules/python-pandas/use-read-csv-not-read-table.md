---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/use-read-csv-not-read-table
  language: Python
  severity: None
title: prefer read_csv to read_table
---
## Metadata
**ID:** `python-pandas/use-read-csv-not-read-table`

**Language:** Python

**Severity:** None

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
