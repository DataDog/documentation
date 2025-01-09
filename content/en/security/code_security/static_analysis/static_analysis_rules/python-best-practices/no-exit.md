---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-exit
- /static_analysis/rules/python-best-practices/no-exit
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-exit
  language: Python
  severity: Error
  severity_rank: 1
title: do not use exit()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-exit`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Use `sys.exit()` instead of `exit()`. Exit is a [builtin](https://docs.python.org/3/library/constants.html#exit) and done mostly for the console. `sys.exit()` is done for program with a proper return argument ([see documentation](https://docs.python.org/3/library/sys.html#sys.exit)).

#### Learn More
 - [Python documentation for `sys.exit()`](https://docs.python.org/3/library/sys.html#sys.exit)

## Non-Compliant Code Examples
```python
print("bla")
exit(0)  # use sys.exit() instead
```

## Compliant Code Examples
```python
import sys
print("bla")
sys.exit(0)
```
