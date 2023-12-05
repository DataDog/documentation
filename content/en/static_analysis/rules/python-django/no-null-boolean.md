---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-django/no-null-boolean
  language: Python
  severity: Notice
title: do not use NullBooleanField
---
## Metadata
**ID:** `python-django/no-null-boolean`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
The `NullBooleanField` type is deprecated. Use the `BooleanField` instead.

## Non-Compliant Code Examples
```python
class Person(models.Model):
    is_adult = models.NullBooleanField()  # use BooleanField

```

## Compliant Code Examples
```python
class Person(models.Model):
    is_adult = models.BooleanField(null=True)
```
