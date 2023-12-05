---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-django/http-response-with-json-dumps
  language: Python
  severity: Notice
title: use JsonResponse instead of HttpResponse to send JSON data
---
## Metadata
**ID:** `python-django/http-response-with-json-dumps`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Use `JsonResponse` instead of `HttpResponse` when attempting to send JSON data.

## Non-Compliant Code Examples
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return HttpResponse(json.dumps(response_data))  # use a JsonResponse to send JSON data

```

## Compliant Code Examples
```python
import json

from django.http import HttpResponse

response_data = {}
response_data['result'] = 'error'
response_data['message'] = 'Some error message'
return JsonResponse(response_data)
```
