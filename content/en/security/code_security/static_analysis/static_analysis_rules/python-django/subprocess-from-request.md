---
aliases:
- /continuous_integration/static_analysis/rules/python-django/subprocess-from-request
- /static_analysis/rules/python-django/subprocess-from-request
dependencies: []
disable_edit: true
group_id: python-django
meta:
  category: Security
  id: python-django/subprocess-from-request
  language: Python
  severity: Error
  severity_rank: 1
title: Command coming from incoming request
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-django/subprocess-from-request`

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
import subprocess

def execute_command(request):
    cmd = request.GET.get("cmd")
    print("foobar")
    subprocess.run(cmd)
    subprocess.call(cmd)
    subprocess.capture_output(cmd)
    subprocess.call(["bash", cmd])

    bli = subprocess.run(cmd)
    bla = subprocess.call(cmd)
    ble = subprocess.capture_output(cmd)
    blo = subprocess.call(["bash", cmd])
    blip = subprocess.call("bash {0}".format(cmd))
    blop = subprocess.call("bash " + cmd)


```

## Compliant Code Examples
```python
import subprocess

def execute_command(request):
    cmd = request.GET.get("cmd")
    print("foobar")
    subprocess.run(shlex.escape(cmd))

```
