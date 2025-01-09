---
aliases:
- /continuous_integration/static_analysis/rules/python-security/insecure-ssl-protocols
- /static_analysis/rules/python-security/insecure-ssl-protocols
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/insecure-ssl-protocols
  language: Python
  severity: Notice
  severity_rank: 3
title: Do not use insecure encryption protocols
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/insecure-ssl-protocols`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
The following security protocols should never be used in Python: `SSLv3`, `SSLv2`, `TLSv1`. For more details, read the [SSL module page](https://docs.python.org/3/library/ssl.html) of the official documentation.

The issue addresses the [CWE-757](https://cwe.mitre.org/data/definitions/757.html) - selection of less-secure algorithm during negotiation.



## Non-Compliant Code Examples
```python
import ssl

def newconnect(self):
  try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    remote = ssl.wrap_socket(s,
                             ca_certs= CA,
                             cert_reqs=ssl.CERT_REQUIRED,
                             ssl_version = ssl.PROTOCOL_SSLv3)
    remote.connect(self.server.seradd)
    if not self.server.seradd[0] == remote.getpeercert()['subjectAltName'][0][1]:
      logging.error('Server crt error !! Server Name don\'t mach !!')
      logging.error(remote.getpeercert()['subjectAltName'][0][1])
      return
    if not self.send_PW(remote):
      logging.warn('PW error !')
      return
    except socket.error, e:
      logging.warn(e)
      return
```

## Compliant Code Examples
```python
import ssl

def newconnect(self):
  try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    remote = ssl.wrap_socket(s,
                             ca_certs= CA,
                             cert_reqs=ssl.CERT_REQUIRED,
                             ssl_version = ssl.PROTOCOL_TLS)
    remote.connect(self.server.seradd)
    if not self.server.seradd[0] == remote.getpeercert()['subjectAltName'][0][1]:
      logging.error('Server crt error !! Server Name don\'t mach !!')
      logging.error(remote.getpeercert()['subjectAltName'][0][1])
      return
    if not self.send_PW(remote):
      logging.warn('PW error !')
      return
    except socket.error, e:
      logging.warn(e)
      return
```
