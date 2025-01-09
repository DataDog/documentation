---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-double-unary-operator
- /static_analysis/rules/python-best-practices/no-double-unary-operator
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-double-unary-operator
  language: Python
  severity: Error
  severity_rank: 1
title: do not use operator -- and ++
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-double-unary-operator`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Operator `--` and `++` do not exists in Python. Increment or decrement the variable appropriately.

## Non-Compliant Code Examples
```python
--n  # use n = n - 1
++n  # use n = n + 1

```

## Compliant Code Examples
```python
n = n + 1
n = n - 1
```
