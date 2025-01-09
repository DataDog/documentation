---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/too-many-while
- /static_analysis/rules/python-best-practices/too-many-while
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/too-many-while
  language: Python
  severity: Warning
  severity_rank: 2
title: 'do not use too many nested loops and conditions '
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/too-many-while`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
A program should have a maximum level of nesting loops. If your program has too many nested loops (`if`/`for`/`while`), consider refactoring your program to avoid too many nesting levels.

## Non-Compliant Code Examples
```python
while bla:
    while foo:
        while bar:
            while baz:
                pass

```

## Compliant Code Examples
```python
while bla:
    while foo:
        while bar:
            pass

```
