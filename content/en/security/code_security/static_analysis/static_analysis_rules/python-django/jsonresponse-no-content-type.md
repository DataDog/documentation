---
aliases:
- /continuous_integration/static_analysis/rules/python-django/jsonresponse-no-content-type
- /static_analysis/rules/python-django/jsonresponse-no-content-type
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Best Practices
  id: python-django/jsonresponse-no-content-type
  language: Python
  severity: Notice
  severity_rank: 3
title: do not specify content-type for JsonResponse
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-django/jsonresponse-no-content-type`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
The `JsonResponse` is already setting the content type of the response. Do not redefine the content type being sent.

## Non-Compliant Code Examples
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data, content_type="application/json")  # content-type is not necessary for JsonResponse
```

## Compliant Code Examples
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)  # content-type is not necessary for JsonResponse
```
