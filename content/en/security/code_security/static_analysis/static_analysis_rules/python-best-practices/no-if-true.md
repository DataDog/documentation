---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-if-true
- /static_analysis/rules/python-best-practices/no-if-true
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Code Style
  id: python-best-practices/no-if-true
  language: Python
  severity: Notice
  severity_rank: 3
title: do not compare to True in a condition
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-if-true`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Do not use `variable == True`, just use `variable`. Comparing against `True` makes the code more complicated to read.

## Non-Compliant Code Examples
```python
if foo == True:  # just used if foo
  print("bar")
```

## Compliant Code Examples
```python
if foo:
  print("bar")
```
