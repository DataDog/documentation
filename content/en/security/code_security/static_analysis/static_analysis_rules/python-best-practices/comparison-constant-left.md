---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/comparison-constant-left
- /static_analysis/rules/python-best-practices/comparison-constant-left
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/comparison-constant-left
  language: Python
  severity: Notice
  severity_rank: 3
title: in comparisons, variables must be left
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/comparison-constant-left`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
In a comparison that compare a variable with a value, put the variable on the left side of the comparison expression.

## Non-Compliant Code Examples
```python
if 1 <= i:  # use i >= 1
  pass
```

```python
if 1.0 <= i:  # use i >= 1.0
  pass
```

## Compliant Code Examples
```python
if i >= 1:
  pass

if 0 < nextSx <= len(subject):
    px = nextPx
    sx = nextSx

if 1 in ctx:
  print("foo")

```
