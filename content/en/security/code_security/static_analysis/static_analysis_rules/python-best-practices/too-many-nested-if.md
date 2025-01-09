---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/too-many-nested-if
- /static_analysis/rules/python-best-practices/too-many-nested-if
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/too-many-nested-if
  language: Python
  severity: Warning
  severity_rank: 2
title: do not use too many nested if conditions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/too-many-nested-if`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Too many nested loops make the code hard to read and understand. Simplify your code by removing nesting levels and separate code in small units.

## Non-Compliant Code Examples
```python
if foo < 0:
    if bar:
        if baz:
            if bao:
                pass
```

## Compliant Code Examples
```python
if foo:
    if bar:
        if baz:
            pass
```
