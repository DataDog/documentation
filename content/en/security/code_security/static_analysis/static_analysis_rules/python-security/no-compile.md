---
aliases:
- /continuous_integration/static_analysis/rules/python-security/no-compile
- /static_analysis/rules/python-security/no-compile
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/no-compile
  language: Python
  severity: Error
  severity_rank: 1
title: The use of compile can be insecure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/no-compile`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
`compile()` is insecure, and passing in unsanitized data could create a vulnerability, as reported by the [official Python documentation](https://docs.python.org/3/library/functions.html#compile). Generated code should be controlled as mentioned in CWE-94.

#### Learn More

-   [CWE-94](https://cwe.mitre.org/data/definitions/94.html) - Improper Control of Generation of Code


## Non-Compliant Code Examples
```python
x = compile('print(55)', 'test', 'eval')
exec(x)
```

## Compliant Code Examples
```python
print(55)
```
