---
aliases:
- /continuous_integration/static_analysis/rules/python-django/no-null-boolean
- /static_analysis/rules/python-django/no-null-boolean
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Best Practices
  id: python-django/no-null-boolean
  language: Python
  severity: Notice
  severity_rank: 3
title: do not use NullBooleanField
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
