---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value
- /static_analysis/rules/python-best-practices/init-no-return-value
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/init-no-return-value
  language: Python
  severity: Info
  severity_rank: 4
title: No return in an __init__ function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/init-no-return-value`

**Language:** Python

**Severity:** Info

**Category:** Error Prone

## Description
The `__init__` method (and the `__new__` method) should never return a non-`None` value.

#### Learn More

 - [`__init__` function on the Python datamodel documentation](https://docs.python.org/3/reference/datamodel.html#object.__init__)

## Non-Compliant Code Examples
```python
class Foo:
	def __init__(self):
		#  __init__ should not return a value
		return 3

	def my_method():
		return 10
```

## Compliant Code Examples
```python
class Foo:
	def __init__(self):
		pass
```
