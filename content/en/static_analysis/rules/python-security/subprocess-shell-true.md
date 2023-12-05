---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/subprocess-shell-true
  language: Python
  severity: Warning
title: shell argument leads to unnecessary privileges
---
## Metadata
**ID:** `python-security/subprocess-shell-true`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
Never invoke `subprocess.Popen` with `shell = True` leads to unnecessary privileges and access to the underlying execution runtime. Execution with `shell = True` should clearly be verified and checked for code in production.

#### Learn More

 - [CWE-250](https://cwe.mitre.org/data/definitions/250.html) - Execution with Unnecessary Privileges
 - [CWE-657](https://cwe.mitre.org/data/definitions/657.html) - Violation of Secure Design Principles

## Non-Compliant Code Examples
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
subprocess.Popen('/bin/ls %s' % ('something',), shell=True)
```
