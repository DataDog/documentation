---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/comp-operator-not-function
- /static_analysis/rules/python-pandas/comp-operator-not-function
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/comp-operator-not-function
  language: Python
  severity: Info
  severity_rank: 4
title: Use operators to compare values, not functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/comp-operator-not-function`

**Language:** Python

**Severity:** Info

**Category:** Best Practices

## Description
User should use comparison operators (`<`, `>`,  etc) instead of function (`.ld`) to make the code more clear.

## Non-Compliant Code Examples
```python
foo.le(bar)
```

## Compliant Code Examples
```python
foo < bar
```
