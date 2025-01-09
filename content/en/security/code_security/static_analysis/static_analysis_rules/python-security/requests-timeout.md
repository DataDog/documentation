---
aliases:
- /continuous_integration/static_analysis/rules/python-security/requests-timeout
- /static_analysis/rules/python-security/requests-timeout
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/requests-timeout
  language: Python
  severity: Error
  severity_rank: 1
title: no timeout was given on call to external resource
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/requests-timeout`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [1088](https://cwe.mitre.org/data/definitions/1088.html)

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
    
    if bar:
        r = requests.get(w, verify=False)
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
