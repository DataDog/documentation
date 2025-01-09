---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/argument-same-name
- /static_analysis/rules/python-best-practices/argument-same-name
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/argument-same-name
  language: Python
  severity: Error
  severity_rank: 1
title: do not have arguments with the same name
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/argument-same-name`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
Function parameters cannot have the same name. Each function parameter must have a distinct name.

## Non-Compliant Code Examples
```python
def foo(bar, bar: int, bar = 3):  # use another name for the second argument
	pass
```

## Compliant Code Examples
```python
def foo(bar, baz):
	pass
```
