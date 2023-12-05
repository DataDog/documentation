---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/os-spawn
  language: Python
  severity: Error
title: Call of a spawn process without sanitization
---
## Metadata
**ID:** `python-security/os-spawn`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Detect unsafe shell execution with the `os` module. We should ensure the command is safe before execution. Use `shlex` to sanitize user inputs.

#### Learn More

 - [Python `os.spawn*()` documentation](https://docs.python.org/3/library/os.html#os.spawnl)
 - [`Python shlex() module`](https://docs.python.org/3/library/shlex.html)
 - [CWE 78 - Improper Neutralization of Special Elements used in an OS Command](https://cwe.mitre.org/data/definitions/78.html)

## Non-Compliant Code Examples
```python
import os

directory = "/tmp"

# Use of unsanitized data to create a process
os.spawnl(os.P_WAIT, "/bin/ls")
os.spawnle(os.P_WAIT, "/bin/ls")
os.spawnlp(os.P_WAIT, "/bin/ls")
os.spawnlpe(os.P_WAIT, "/bin/ls")
os.spawnv(os.P_WAIT, "/bin/ls")
os.spawnve(os.P_WAIT, "/bin/ls")
os.spawnvp(os.P_WAIT, "/bin/ls")
os.spawnvpe(os.P_WAIT, "/bin/ls")


os.spawnvpe(os.P_WAIT, "/bin/ls " + directory)
```

## Compliant Code Examples
```python
import os
import shlex

# Use of shlex() to sanitize data
os.spawnl(os.P_WAIT, shlex.escape("/bin/ls"))
```
