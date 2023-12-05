---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/insecure-jwt
  language: Python
  severity: Notice
title: Ensure JWT signatures are verified
---
## Metadata
**ID:** `python-security/insecure-jwt`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
Use `"verify_signature": False` when decoding a JWT bypasses security and may authenticate users that should not be authenticated.

**See Also**

 - [CWE-287 - Improper Authentication](https://cwe.mitre.org/data/definitions/287.html)

## Non-Compliant Code Examples
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
jwt.decode(encoded, options={"verify_signature": True})
```
