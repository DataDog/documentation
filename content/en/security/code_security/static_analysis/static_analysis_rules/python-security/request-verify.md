---
aliases:
- /continuous_integration/static_analysis/rules/python-security/request-verify
- /static_analysis/rules/python-security/request-verify
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/request-verify
  language: Python
  severity: Error
  severity_rank: 1
title: verify should be True
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/request-verify`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
The `verify` parameter controls whether the SSL certificate should be verified during your server requests. It's strongly recommended to set this parameter to `True` which is the default value. This rule will warn you when it's detected `False` has been set.

## Non-Compliant Code Examples
```python
import requests

def fetch_data():
    r = requests.get(w, verify=False, timeout=5)
```

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
