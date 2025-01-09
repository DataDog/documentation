---
aliases:
- /continuous_integration/static_analysis/rules/python-security/asyncio-subprocess-exec
- /static_analysis/rules/python-security/asyncio-subprocess-exec
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/asyncio-subprocess-exec
  language: Python
  severity: Error
  severity_rank: 1
title: Unsafe execution of shell commands
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/asyncio-subprocess-exec`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Detect unsafe shell execution in the asyncio framework. When we invoke the shell, we should make sure that the data is safe and secure. Use `shlex` to sanitize user inputs.

#### Learn More

 - [`Python shlex() module`](https://docs.python.org/3/library/shlex.html)
 - [CWE 78 - Improper Neutralization of Special Elements used in an OS Command](https://cwe.mitre.org/data/definitions/78.html)

## Non-Compliant Code Examples
```python
import asyncio

def handler(event, context):
    # Should sanitize arguments
    async_loop.run_until_complete(async_loop.subprocess_exec(waiting_protocol, ["/bin/sh", "mycommand"]))
```

## Compliant Code Examples
```python
import asyncio
import shlex

def handler(event, context):
    # Should sanitize arguments
    async_loop.run_until_complete(async_loop.subprocess_exec(waiting_protocol, shlex.split(shlex.quote("/bin/sh mycommand"))))
```
