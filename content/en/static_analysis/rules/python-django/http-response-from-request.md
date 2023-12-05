---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-django/http-response-from-request
  language: Python
  severity: Error
title: Lack of sanitization of user data
---
## Metadata
**ID:** `python-django/http-response-from-request`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
The response sent with an `HttpResponse` contains unsanitized request data. The data should be sanitized before being returns in an `HttpResponse`.

#### Learn More

 - [CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)

## Non-Compliant Code Examples
```python
def execute_command(request):
    data = request.GET.get("data")
    print("foobar")
    foo = HttpResponse("data: '{0}'".format(data))
    foo = HttpResponse(data)
    return HttpResponse("data: '{0}'".format(data))
```

## Compliant Code Examples
```python
def execute_command(request):
    data = request.GET.get("data")
    print("foobar")
    return HttpResponse("user '{user}' does not exist".format(sanitize_data(data)))

```
