---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-flask/listen-all-interfaces
  language: Python
  severity: Notice
title: Your application should not listen on all interfaces
---
## Metadata
**ID:** `python-flask/listen-all-interfaces`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
Avoid giving access to your resources to all connected interfaces. Instead, bind the resources on a specific interface. Running the server on 0.0.0.0 exposes the server publicly.

#### Learn More

 - [CWE-668 - Exposure of Resource to Wrong Sphere](https://cwe.mitre.org/data/definitions/668.html)
 - [OWASP A01-2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)

## Non-Compliant Code Examples
```python
#ruleid:avoid_app_run_with_bad_host
app.run(host="0.0.0.0")

#ruleid:avoid_app_run_with_bad_host
app.run("0.0.0.0")

```

## Compliant Code Examples
```python
#ruleid:avoid_app_run_with_bad_host
app.run(host="192.168.10.4")

#ruleid:avoid_app_run_with_bad_host
app.run("192.168.10.4")

```
