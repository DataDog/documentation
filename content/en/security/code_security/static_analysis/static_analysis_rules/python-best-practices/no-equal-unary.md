---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-equal-unary
- /static_analysis/rules/python-best-practices/no-equal-unary
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-equal-unary
  language: Python
  severity: Error
  severity_rank: 1
title: do not use operations =+ and =-
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-equal-unary`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Operator `=+` and `=-`  do not exist in Python. The code is valid but is unlikely doing what the developer wants to achieve.

## Non-Compliant Code Examples
```python
# =+ does not exists in Python, use n = n + 3
n =+ 3

# =- does not exists in Python, use n = n - 3
n =- 3
```

## Compliant Code Examples
```python
n = n + 3

n = n - 3

foo = -1
```
