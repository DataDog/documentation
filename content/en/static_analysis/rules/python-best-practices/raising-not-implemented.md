---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/raising-not-implemented
  language: Python
  severity: Warning
title: Do not raise NotImplemented - it does not exists
---
## Metadata
**ID:** `python-best-practices/raising-not-implemented`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Code should not raise `NotImplemented` and instead use `NotImplementedError`. `NotImplemented` is a value (as per the [documentation](https://docs.python.org/3/library/constants.html#NotImplemented), not an exception. The proper exception is [NotImplementedError](https://docs.python.org/3/library/exceptions.html#NotImplementedError)

#### Learn More

 - [NotImplementedError documentation](https://docs.python.org/3/library/exceptions.html#NotImplementedError)

## Non-Compliant Code Examples
```python
a = 1
b = 2
raise NotImplemented  # use NotImplementedError instead
c = 3
```

## Compliant Code Examples
```python
a = 1
b = 2
raise NotImplementedError
c = 3
```
