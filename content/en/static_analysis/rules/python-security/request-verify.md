---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/request-verify
  language: Python
  severity: Error
title: verify should be True
---
## Metadata
**ID:** `python-security/request-verify`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
The `verify` parameter controls whether the SSL certificate should be verified during your server requests. It's strongly recommended to set this parameter to `True` which is the default value. This rule will warn you when it's detected `False` has been set.

## Non-Compliant Code Examples
```python
from requests import get
r = get(w, verify=False)  # verify should be True
r = get(w, verify=False, timeout=10)  # verify should be True
```

## Compliant Code Examples
```python
from requests import get
r = get(w)
r = get(w, timeout=10, verify=True)
```

```python
from requests import get
r = get(w)
r = get(w, timeout=10)
```
