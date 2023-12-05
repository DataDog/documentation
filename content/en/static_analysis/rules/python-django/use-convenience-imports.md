---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-django/use-convenience-imports
  language: Python
  severity: Notice
title: use convenience imports whenever possible
---
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
