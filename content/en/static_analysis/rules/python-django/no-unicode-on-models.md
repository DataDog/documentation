---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-django/no-unicode-on-models
  language: Python
  severity: Warning
title: do not use __unicode__
---
## Metadata
**ID:** `python-django/no-unicode-on-models`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Do not use `__unicode__` on Django models. The field `__unicode__` is used for Python 2. Use `__str__` instead, `__str__` is used with Python 3.

## Non-Compliant Code Examples
```python
class Person(models.Model):
    
    def __unicode__(self):  # do not define __unicode__, define __str__
       pass
```

## Compliant Code Examples
```python
class Person(models.Model):
    
    def __str__(self):
       "person"
```
