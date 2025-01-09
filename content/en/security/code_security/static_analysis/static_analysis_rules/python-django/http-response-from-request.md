---
aliases:
- /continuous_integration/static_analysis/rules/python-django/http-response-from-request
- /static_analysis/rules/python-django/http-response-from-request
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Security
  id: python-django/http-response-from-request
  language: Python
  severity: Error
  severity_rank: 1
title: Lack of sanitization of user data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-django/http-response-from-request`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

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
