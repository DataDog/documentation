---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/equal-basic-types
- /static_analysis/rules/python-best-practices/equal-basic-types
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/equal-basic-types
  language: Python
  severity: Warning
  severity_rank: 2
title: check equal is used on consistent basic types
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/equal-basic-types`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
When comparing basic types (string, integer, float), we should always values of the same types.

## Non-Compliant Code Examples
```python
1 == "1"  # Comparing an integer and a string
1.0 == "foo"  # Comparing a float and a string
```

## Compliant Code Examples
```python
1 == 1
"abc" == "def"
a == 1
a == b
```
