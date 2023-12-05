---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/generic-exception-last
  language: Python
  severity: Notice
title: If using generic exception, it should be last
---
## Metadata
**ID:** `python-best-practices/generic-exception-last`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
When multiple exceptions are caught, the generic `Exception` must be caught last. Catching `Exception` is very generic and if placed before specific exceptions, it will caught all exceptions and specific exception handlers will not be caught.

For this reason, generic `Exception` must be the last to be handled to let specific exception handlers to be triggered/executed.

#### Learn More

- [Python tutorials on errors](https://docs.python.org/3/tutorial/errors.html)

## Non-Compliant Code Examples
```python
try:
	pass
except Exception:
	pass
except FileNotFound as e:
	pass
```

## Compliant Code Examples
```python
try:
	pass
except MyError:
	pass
except Exception as e:
	pass
```

```python
try:
	pass
except MyError:
	pass
except FileNotFound as e:
	pass
```
