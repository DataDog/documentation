---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-flask/secure-cookie
  language: Python
  severity: Notice
title: Make sure cookies are safe and secure
---
## Metadata
**ID:** `python-flask/secure-cookie`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
Cookies must have the `secure` and `httponly` parameters set to True.

#### Learn More

 - [CWE-614: Sensitive Cookie in HTTPS Session Without 'Secure' Attribute](https://cwe.mitre.org/data/definitions/614.html)

## Non-Compliant Code Examples
```python
response.set_cookie('username', 'flask', secure=False, httponly=False, samesite="Lax")
response.set_cookie('username', 'flask', secure=True, httponly=False, samesite="Lax")
response.set_cookie('username', 'flask', secure=False, httponly=True, samesite=None)
response.set_cookie('username', 'flask', samesite=None, secure=False, httponly=True)
response.set_cookie('username', 'flask', secure=False, samesite=None)
response.set_cookie('username', 'flask', samesite=None, httponly=True)

```

## Compliant Code Examples
```python
response.set_cookie('username', 'flask', secure=True, httponly=True, samesite='Lax')
```
