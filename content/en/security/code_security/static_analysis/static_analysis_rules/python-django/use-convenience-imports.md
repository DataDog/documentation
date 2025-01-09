---
aliases:
- /continuous_integration/static_analysis/rules/python-django/use-convenience-imports
- /static_analysis/rules/python-django/use-convenience-imports
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Code Style
  id: python-django/use-convenience-imports
  language: Python
  severity: Notice
  severity_rank: 3
title: use convenience imports whenever possible
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-django/use-convenience-imports`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Use convenient imports from Django whenever possible.

## Non-Compliant Code Examples
```python
from django.views.generic.base import View  # use django.views
```

## Compliant Code Examples
```python
from django.views import View
```
