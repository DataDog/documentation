---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/type-check-isinstance
  language: Python
  severity: Notice
title: use isinstance instead of type
---
## Metadata
**ID:** `python-best-practices/type-check-isinstance`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Using `isinstance` is faster than `type` but also consider inheritance, which makes it more accurate.

## Non-Compliant Code Examples
```python
# use isinstance instead of
if type(Foo()) == Foo:
    print("is foo")
```

## Compliant Code Examples
```python
raise ValueError("target %s config %s has type of %s" % (target, config_content, type(config_content)))
```

```python
if isinstance(Bar(), Foo):
    print("foo")
```
