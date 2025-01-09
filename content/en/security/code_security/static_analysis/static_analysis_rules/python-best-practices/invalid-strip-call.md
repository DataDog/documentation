---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/invalid-strip-call
- /static_analysis/rules/python-best-practices/invalid-strip-call
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/invalid-strip-call
  language: Python
  severity: Notice
  severity_rank: 3
title: strip() argument should not have duplicate characters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/invalid-strip-call`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
When using `.strip()`, you only need to pass the letters you want to split on. There is no need to specify the same letter twice.

## Non-Compliant Code Examples
```python
"Hello World".strip("Hello")  # letter l is present twice in the string
```

## Compliant Code Examples
```python
"Hello World".strip("Helo")  # letter l is present twice in the string
```
