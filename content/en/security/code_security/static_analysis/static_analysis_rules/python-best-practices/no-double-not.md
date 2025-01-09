---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-double-not
- /static_analysis/rules/python-best-practices/no-double-not
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/no-double-not
  language: Python
  severity: Warning
  severity_rank: 2
title: do not use double negation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-double-not`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
Do not use two negation. It makes the code more complex to read and understand. Instead of using two negation, use the expression directly.

## Non-Compliant Code Examples
```python
if not not foo:  # just use if foo
	pass
```

## Compliant Code Examples
```python
if not foo:
	pass
```
