---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/ssl-unverified-context
  language: Python
  severity: Notice
title: should not bypass certificate verification
---
## Metadata
**ID:** `python-security/ssl-unverified-context`

**Language:** Python

**Severity:** Notice

**Category:** Security

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
