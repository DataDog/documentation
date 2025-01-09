---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/self-assignment
- /static_analysis/rules/python-best-practices/self-assignment
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/self-assignment
  language: Python
  severity: Notice
  severity_rank: 3
title: do not assign to itself
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/self-assignment`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Do not assign a value to itself. Instead, assign the value to a different variable to make the data flow clear to read and understand.

## Non-Compliant Code Examples
```python
def foo():
	bar = bar  # avoid self assignment
```

## Compliant Code Examples
```python
def foo():
	bar = baz
```
