---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/unreachable-code
- /static_analysis/rules/python-best-practices/unreachable-code
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/unreachable-code
  language: Python
  severity: Notice
  severity_rank: 3
title: avoid unreachable code
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/unreachable-code`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid unreachable code. If the code cannot be reached because of a coding mistake, fix the business logic. If the code should not be used, remove it.


#### Learn More

 - [Carnegie Mellon University: Avoid having unreachable code](https://wiki.sei.cmu.edu/confluence/display/android/Avoid+having+unreachable+code)

## Non-Compliant Code Examples
```python
def foo():
  return 3
  foo()  # unreachable code
  pass  # unreachable code
```

## Compliant Code Examples
```python
def foo():
	foo()
	pass
	return 3

```
