---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/no-render-template-string
- /static_analysis/rules/python-flask/no-render-template-string
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/no-render-template-string
  language: Python
  severity: Error
  severity_rank: 1
title: Do not use template created with strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/no-render-template-string`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [96](https://cwe.mitre.org/data/definitions/96.html)

## Description
Using templates created with string leads to server-side injection. Use template based on files.

#### Learn More

 - [CWE-96: Improper Neutralization of Directives in Statically Saved](https://cwe.mitre.org/data/definitions/96.html)

## Non-Compliant Code Examples
```python
import os
from functools import wraps
from flask import request, redirect, url_for, render_template_string


API_KEY = os.environ.get('VULN_FLASK_APP_API_KEY')

# Decorator to check if user is logged in
def require_api_key(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        api_key = request.cookies.get('api_key')
        if API_KEY is None or api_key == API_KEY:
            return f(*args, **kwargs)
        else:
            return render_template_string('no api key found'), 401
    return wrap
```
