---
aliases:
- /continuous_integration/static_analysis/rules/python-security/subprocess-shell-true
- /static_analysis/rules/python-security/subprocess-shell-true
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/subprocess-shell-true
  language: Python
  severity: Warning
  severity_rank: 2
title: shell argument leads to unnecessary privileges
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/subprocess-shell-true`

**Language:** Python

**Severity:** Warning

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Never invoke `subprocess.Popen` with `shell = True` leads to unnecessary privileges and access to the underlying execution runtime. Execution with `shell = True` should clearly be verified and checked for code in production.

#### Learn More

 - [CWE-250](https://cwe.mitre.org/data/definitions/250.html) - Execution with Unnecessary Privileges
 - [CWE-657](https://cwe.mitre.org/data/definitions/657.html) - Violation of Secure Design Principles

## Non-Compliant Code Examples
```python
import subprocess

def find_dogweb_packages():
    # setuptools.find_packages is too slow since it walks the entire codebase, including Javascript code.
    # This is an equivalent but optimized function, specific to our codebase, listing all the available
    # packages.

    # Look for __init__.py files using fast UNIX tools
    r = subprocess.Popen(
        "find %s -name '__init__.py'" % " ".join(MODULE_PATHS), shell=True, stdout=subprocess.PIPE
    ).stdout.read()
```

```python
from subprocess import Popen
Popen('/bin/ls %s' % ('something',), shell=True)
```

```python
import subprocess
subprocess.Popen('/bin/ls %s' % ('something',), shell=True)
```

## Compliant Code Examples
```python
subprocess.Popen('/bin/ls %s' % ('something',), shell=False)
```
