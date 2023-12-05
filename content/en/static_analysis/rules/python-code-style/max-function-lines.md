---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-code-style/max-function-lines
  language: Python
  severity: Error
title: Functions must be less than 200 lines
---
## Metadata
**ID:** `python-code-style/max-function-lines`

**Language:** Python

**Severity:** Error

**Category:** Code Style

## Description
Ensure that a function is not too long. A function should be less than 100 lines. Otherwise, it's too long and hard to understand.

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
