---
aliases:
- /continuous_integration/static_analysis/rules/python-django/os-system-from-request
- /static_analysis/rules/python-django/os-system-from-request
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Security
  id: python-django/os-system-from-request
  language: Python
  severity: Error
  severity_rank: 1
title: Command coming from incoming request
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-django/os-system-from-request`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [20](https://cwe.mitre.org/data/definitions/20.html)

## Description
Execute a process using unsanitized and unvalidated user-inputs. The user data should be sanitized and validated before being used to launch a new process.

#### Learn More

 - [CWE-20: Improper Input Validation](https://cwe.mitre.org/data/definitions/20.html)

## Non-Compliant Code Examples
```python
import os

def execute_command(request):
    cmd = request.GET.get("cmd")
    print("foobar")
    os.system(cmd)

    bli = os.system(cmd)

```

## Compliant Code Examples
```python
import os
import shlex

def execute_command(request):
    cmd = request.GET.get("cmd")
    print("foobar")
    os.system(shlex.escape(cmd))

```
