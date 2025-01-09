---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self
- /static_analysis/rules/python-best-practices/class-methods-use-self
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/class-methods-use-self
  language: Python
  severity: Error
  severity_rank: 1
title: Class methods should use self as first argument
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/class-methods-use-self`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
In a class method (that is not a class method nor a static method), the first argument must be `self` by convention.

#### Learn More

 - [Method Objects on the Python documentation](https://docs.python.org/3.8/tutorial/classes.html#method-objects)
 - [PEP8 style guide](https://peps.python.org/pep-0008/#function-and-method-arguments)

## Non-Compliant Code Examples
```python
class Foo:
	def bar(bar):  # use def bar(self) instead
		pass
```

## Compliant Code Examples
```python
class Foo:
	@staticmethod
	def static_method(bar):
		pass

	@classmethod
	def class_method(bar):
		pass

	def __call__(cls, *args, **kwargs):
		pass
	
class IFoo(Interface): # zope interfaces won't get flagged
	def method(i):
		pass
```
