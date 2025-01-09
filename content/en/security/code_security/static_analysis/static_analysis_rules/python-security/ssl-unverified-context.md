---
aliases:
- /continuous_integration/static_analysis/rules/python-security/ssl-unverified-context
- /static_analysis/rules/python-security/ssl-unverified-context
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/ssl-unverified-context
  language: Python
  severity: Notice
  severity_rank: 3
title: should not bypass certificate verification
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/ssl-unverified-context`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
The call to `_create_unverified_context` from the ssl module bypass certificates verification. It should not be used and instead, certificates must be verified.

## Non-Compliant Code Examples
```python
import xmlrpclib
import ssl

test = xmlrpclib.ServerProxy('https://admin:bz15h9v9n@localhost:9999/API',
                             verbose=False, use_datetime=True, 
                             context=ssl._create_unverified_context()) 
test.list_satellites()
```

## Compliant Code Examples
```python
import xmlrpclib
import ssl

test = xmlrpclib.ServerProxy('https://admin:bz15h9v9n@localhost:9999/API',
                             verbose=False, use_datetime=True)
test.list_satellites()
```

```python
import xmlrpclib

test = xmlrpclib.ServerProxy('https://admin:bz15h9v9n@localhost:9999/API',
                             verbose=False, use_datetime=True, 
                             context=ssl._create_unverified_context())
test.list_satellites()
```
