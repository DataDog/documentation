---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/insecure-hash-functions
  language: Python
  severity: Warning
title: Do not use insecure functions
---
## Metadata
**ID:** `python-security/insecure-hash-functions`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
Do not use a broken or risky cryptographic algorithm. This exposes you to unwanted attacks.

It checks the following modules
 - [hashlib](https://docs.python.org/3/library/hashlib.html)
 - [cryptography](https://cryptography.io/)

#### Learn More

 - [CWE-327](https://cwe.mitre.org/data/definitions/327.html) - Use of a Broken or Risky Cryptographic Algorithm
 - [CWE-328](https://cwe.mitre.org/data/definitions/328.html) - Use of Weak Hash

## Non-Compliant Code Examples
```python
from cryptography.hazmat.primitives import hashes
digest = hashes.Hash(hashes.MD5())
```

```python
from cryptography.hazmat.primitives import hashes
digest = hashes.Hash(hashes.MD5())
```

```python
import hashlib

hashlib.new('md5')
hashlib.new('md4')


hashlib.md5("bla");
```
