---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-base-exception
  language: Python
  severity: Notice
title: do not raise base exception
---
## Metadata
**ID:** `python-best-practices/no-base-exception`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Do not raise `Exception` and `BaseException`. These are too generic. Having generic exceptions makes it difficult to differentiate errors in a program. Use a specific exception, for example, `ValueError`, or create your own instead of using generic ones.

#### Learn More

 - [Stop using `raise Exception`](https://jerrynsh.com/stop-using-exceptions-like-this-in-python/#2-stop-using-raise-exception)

## Non-Compliant Code Examples
```python
if foo:
	raise Exception("bla")
elif bar:
	raise Exception
else:
	raise Exception
```

```python
def use_base_exception():
	raise Exception
	raise Exception("awesome")
```

```python
for v in list:
	raise BaseException
```

## Compliant Code Examples
```python
if foo:
	print("bar")
else:
	raise ValueError
```
