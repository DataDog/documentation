---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-function-name
- /static_analysis/rules/python-best-practices/ambiguous-function-name
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/ambiguous-function-name
  language: Python
  severity: Notice
  severity_rank: 3
title: make sure function names are readable
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/ambiguous-function-name`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
In some fonts, these characters are indistinguishable from the numerals one and zero. Use characters that are not ambiguous.

## Non-Compliant Code Examples
```python
def I():  # use i instead
    pass
```

## Compliant Code Examples
```python
def i():
    pass
```
