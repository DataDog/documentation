---
aliases:
- /continuous_integration/static_analysis/rules/python-security/no-eval
- /static_analysis/rules/python-security/no-eval
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/no-eval
  language: Python
  severity: Notice
  severity_rank: 3
title: use of eval can be insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/no-eval`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
`eval()` is insecure, and passing in unsanitized data could create a vulnerability, as reported by the [official Python documentation](https://docs.python.org/3/library/functions.html#eval). Generated code should be controlled as mentioned by CWE-94.

#### Learn More

 - [CWE-94](https://cwe.mitre.org/data/definitions/94.html) - Improper Control of Generation of Code

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
