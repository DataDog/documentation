---
aliases:
- /continuous_integration/static_analysis/rules/python-security/mktemp
- /static_analysis/rules/python-security/mktemp
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/mktemp
  language: Python
  severity: Notice
  severity_rank: 3
title: Make sure temporary files are secure
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/mktemp`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [377](https://cwe.mitre.org/data/definitions/377.html)

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
