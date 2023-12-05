---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/asyncio-subprocess-create-shell
  language: Python
  severity: Error
title: Unsafe execution of shell commands
---
## Metadata
**ID:** `python-security/asyncio-subprocess-create-shell`

**Language:** Python

**Severity:** Error

**Category:** Security

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
    async_loop.run_until_complete(async_loop.create_subprocess_shell("mycommand"))

```

## Compliant Code Examples
```python
import asyncio
import shlex

def handler(event, context):
    # Should sanitize arguments
    async_loop.run_until_complete(async_loop.create_subprocess_shell(shlex.escape("mycommand")))
```
