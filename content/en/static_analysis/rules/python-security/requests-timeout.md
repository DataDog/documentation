---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/requests-timeout
  language: Python
  severity: Error
title: no timeout was given on call to external resource
---
## Metadata
**ID:** `python-security/requests-timeout`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.

#### Learn More

 - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)
 - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)

## Non-Compliant Code Examples
```python
from requests import get, put
r = get(w, verify=False) # missing a timeout
r = get(w, verify=False, timeout=10)

def bla():
    r = get(w, verify=False)
```

```python
import requests
r = requests.put(w, verify=False) # missing a timeout
```

```python
import requests
r = requests.get(w, verify=False) # missing a timeout
r = requests.get(w, verify=False, timeout=10)



def foo():
    r = requests.get(w, verify=False) # missing a timeout
```

## Compliant Code Examples
```python
r = requests.put(w, verify=False)
```

```python
import requests
r = requests.get(w, verify=False, timeout=5)
r = requests.get(w, verify=False, timeout=10)
```
