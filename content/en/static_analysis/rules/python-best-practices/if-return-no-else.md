---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/if-return-no-else
  language: Python
  severity: Notice
title: when an if condition returns an value, else is not necessary
---
## Metadata
**ID:** `python-best-practices/if-return-no-else`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
If the code in the `if` branch returns a value, do not have the `else` branch present.

## Non-Compliant Code Examples
```python
if bla:
	foo()
	return 1
else:  # unnecessary, remove the else branch
	return 2
```

## Compliant Code Examples
```python
if bla:
	foo()
	return 1
return 2
```

```python
if bla:
	foo()
else:
	return 2
```
