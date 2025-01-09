---
aliases:
- /continuous_integration/static_analysis/rules/python-django/model-help-text
- /static_analysis/rules/python-django/model-help-text
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Best Practices
  id: python-django/model-help-text
  language: Python
  severity: Notice
  severity_rank: 3
title: use help_text to document model columns
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
