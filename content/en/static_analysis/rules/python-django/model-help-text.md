---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-django/model-help-text
  language: Python
  severity: Notice
title: use help_text to document model columns
---
## Metadata
**ID:** `python-django/model-help-text`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Use `help_text` to document the fields used in your database.

#### Learn More

 - [Django Documentation: `help_text`](https://docs.djangoproject.com/en/4.2/ref/models/fields/#help-text)

## Non-Compliant Code Examples
```python
class MyModel(models.Model):
  my_field = models.DateField()
  last_name = models.CharField(max_length=40)  # add help_text to explain what this field is doing
```

## Compliant Code Examples
```python
class MyModel(models.Model):
  my_field = models.DateField(help_text = "Use format YYYY/MM/DD")
```
