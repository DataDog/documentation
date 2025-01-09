---
aliases:
- /continuous_integration/static_analysis/rules/python-security/insecure-jwt
- /static_analysis/rules/python-security/insecure-jwt
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/insecure-jwt
  language: Python
  severity: Notice
  severity_rank: 3
title: Ensure JWT signatures are verified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/insecure-jwt`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [287](https://cwe.mitre.org/data/definitions/287.html)

## Description
Use `"verify_signature": False` when decoding a JWT bypasses security and may authenticate users that should not be authenticated.

**See Also**

 - [CWE-287 - Improper Authentication](https://cwe.mitre.org/data/definitions/287.html)

## Non-Compliant Code Examples
```python
import jwt

def insecure_verify(token):
    decoded = jwt.decode(token, verify=False)
    print decoded
    return True

```

```python
import jwt

jwt.decode(encoded, options={"verify_signature": False})

```

## Compliant Code Examples
```python
import jwt

jwt.decode(encoded, bla={"verify_signature": False})

jwt.decode(encoded, options={"foobar": False})

```

```python
import jwt

jwt.decode(encoded, options={"verify_signature": True})
```

```python
jwt.decode(encoded, options={"verify_signature": False})
```
