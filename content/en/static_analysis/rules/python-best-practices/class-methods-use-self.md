---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/class-methods-use-self
  language: Python
  severity: Error
title: Class methods should not use self
---
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
```
