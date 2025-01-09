---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/condition-similar-block
- /static_analysis/rules/python-best-practices/condition-similar-block
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/condition-similar-block
  language: Python
  severity: Warning
  severity_rank: 2
title: if conditions must have different code blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/condition-similar-block`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Code in the branches of an `if` condition must be unique. If you have duplicated branches, merge the conditions.

## Non-Compliant Code Examples
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  # same code than the if condition
  printf("bar")
else:
  # same code than the if condition
  printf("bar")
```

## Compliant Code Examples
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  printf("bar3")
else:
  printf("bar4")
```
