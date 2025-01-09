---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/avoid-duplicate-keys
- /static_analysis/rules/python-best-practices/avoid-duplicate-keys
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/avoid-duplicate-keys
  language: Python
  severity: Warning
  severity_rank: 2
title: Avoid duplicate keys in dictionaries
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/avoid-duplicate-keys`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Keys in a dictionary must be unique.

## Non-Compliant Code Examples
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
  "key1": "bla"
}

```

## Compliant Code Examples
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
}

```
