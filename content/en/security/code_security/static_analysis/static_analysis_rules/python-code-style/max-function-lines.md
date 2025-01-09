---
aliases:
- /continuous_integration/static_analysis/rules/python-code-style/max-function-lines
- /static_analysis/rules/python-code-style/max-function-lines
dependencies: []
disable_edit: true
group_id: python-code-style
meta:
  category: Code Style
  id: python-code-style/max-function-lines
  language: Python
  severity: Error
  severity_rank: 1
title: Functions must be less than 200 lines
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-code-style/max-function-lines`

**Language:** Python

**Severity:** Error

**Category:** Code Style

## Description
This rule stipulates that functions in Python should not exceed 200 lines of code. The primary reason for this rule is to promote readability and maintainability of the code. When functions are concise and focused, they are easier to understand, test, and debug.

Long functions often indicate that a single function is doing too much. Adhering to the Single Responsibility Principle (SRP) can help avoid this. SRP states that a function should have only one reason to change. If a function is doing more than one thing, it can usually be split into several smaller, more specific functions.

In practice, to adhere to this rule, you can often break up long functions into smaller helper functions. If a piece of code within a function is independent and can be isolated, it is a good candidate to be moved into a separate function. This also increases code reusability. For instance, if a function `process_data()` is too long, you can identify independent tasks within it - such as `clean_data()`, `transform_data()`, and `save_data()` - and create separate functions for them. This makes the code easier to reason about and test, and promotes good coding practices.

## Arguments

 * `max-lines`: Maximum number of lines. Default: 200.

## Non-Compliant Code Examples
```python
def myfunction():
	foo()
	bar()











	










	










	










	










	










	










	










	










	










	










	










	










	










	










	










	










	










	










	










	
	pass
```

## Compliant Code Examples
```python
def myfunction(args):
	foo()
	bar()
	pass
```
