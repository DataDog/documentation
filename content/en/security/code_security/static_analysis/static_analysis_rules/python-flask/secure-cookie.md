---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/secure-cookie
- /static_analysis/rules/python-flask/secure-cookie
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/secure-cookie
  language: Python
  severity: Notice
  severity_rank: 3
title: Make sure cookies are safe and secure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/secure-cookie`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [614](https://cwe.mitre.org/data/definitions/614.html)

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
