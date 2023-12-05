---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/unreachable-code
  language: Python
  severity: Notice
title: avoid unreachable code
---
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
