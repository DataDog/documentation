---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/no-eval
  language: Python
  severity: Notice
title: use of eval can be insecure
---
## Metadata
**ID:** `python-security/no-eval`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
`eval()` is insecure, and uncontrolled data could then create a vulnerability, as reported by the [official Python documentation](https://docs.python.org/3/library/functions.html#eval). Generated code should be controlled as mentioned by [CWE-94](https://cwe.mitre.org/data/definitions/94.html).

#### Learn More

 - [CWE-94](https://cwe.mitre.org/data/definitions/94.html) - Improper Control of Generation of Code
 - [Safe and Secure Python: do not use eval()](https://www.codiga.io/blog/python-eval/)

## Non-Compliant Code Examples
```python
print("bla")
eval('[1, 2, 3]') # eval() can be unsafe
```

## Compliant Code Examples
```python
import foo
foo.eval('[1, 2, 3]')
```

```python
from ast import literal_eval
print("bla")
literal_eval('[1, 2, 3]')
```
