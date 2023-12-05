---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-django/model-charfield-max-length
  language: Python
  severity: Warning
title: always specify max_length for a Charfield
---
## Metadata
**ID:** `python-django/model-charfield-max-length`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
On a `Charfield`, define the attribute `max_length` to specify the maximum size of a field.

## Non-Compliant Code Examples
```python
class Person(models.Model):
    first_name = models.CharField()  # define max_length
    last_name = models.CharField()  # define max_length
```

## Compliant Code Examples
```python
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```
