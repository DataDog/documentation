---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/mktemp
  language: Python
  severity: Notice
title: Make sure temporary files are secure
---
## Metadata
**ID:** `python-security/mktemp`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
Using insecure temporary files makes your program vulnerable to attacks. The official [Python documentation](https://docs.python.org/3/library/tempfile.html) reports this module being vulnerable to attacks. Instead of `mktemp`, use the secure version `mkstemp()`. 


#### Learn More

 - [CWE-377 - Insecure Temporary File](https://cwe.mitre.org/data/definitions/377.html)
 - [Python documentation for mktemp()](https://docs.python.org/3/library/tempfile.html)

## Non-Compliant Code Examples
```python
from tempfile import mktemp
mktemp(dir=self._tmp_dir)
```

```python
import tempfile
tempfile.mktemp(dir=self._tmp_dir)
```

## Compliant Code Examples
```python
tempfile.mktemp(dir=self._tmp_dir)
```

```python
import tempfile
tempfile.mkstemp(dir=self._tmp_dir)
```
