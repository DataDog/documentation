---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/cookie-injection
- /static_analysis/rules/python-flask/cookie-injection
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/cookie-injection
  language: Python
  severity: Error
  severity_rank: 1
title: Avoid potential cookie injections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/cookie-injection`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [20](https://cwe.mitre.org/data/definitions/20.html)

## Description
The rule "Avoid potential cookie injections" is important to prevent the exploitation of insecure handling of cookies in your application. Cookie injection attacks can lead to unauthorized access and alteration of user data, which may result in serious security breaches such as session hijacking and identity theft. 

In the non-compliant code, the user input is directly used to set a cookie. This is insecure because an attacker could potentially inject malicious content into the cookie. 

To avoid violating this rule, ensure that user input is properly sanitized before using it to set a cookie. In the compliant code, the user input is first passed through a HMAC function, which creates a fixed-size string based on the input and a secret key. This ensures that even if an attacker can control the input, they cannot control the output or reverse-engineer the key. The cookie is also set with the `httponly`, `secure`, and `samesite` attributes to further enhance security.

## Non-Compliant Code Examples
```python
import base64
from flask import request, make_response, redirect

def getLoginRequestUsername(request):
    return request.form['username']

def createSuccessfulLoggedInResponse(request):
    username = getLoginRequestUsername(request)
    response = make_response(redirect("/panel"))
    response.set_cookie("sessionid", base64.b64encode(username.encode()))
    return response
```

## Compliant Code Examples
```python
import base64
import hmac
import hashlib
from flask import request, make_response, redirect

def get_login_request_username(request):
    username = request.form.get('username')
    if not username or len(username) > 150:
        raise ValueError("Invalid username")
    return username

def generate_session_id(username):
    return base64.b64encode(
        hmac.new(KEY, username.encode(), hashlib.sha256).digest()
    ).decode('utf-8')

def create_successful_logged_in_response(request):
    username = get_login_request_username(request)
    session_id = generate_session_id(username)
    response = make_response(redirect("/panel"))
    response.set_cookie(
        "sessionid",
        session_id,
        httponly=True,
        secure=True,
        samesite='Lax'
    )
    return response
```
