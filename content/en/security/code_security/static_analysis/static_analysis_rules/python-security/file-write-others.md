---
aliases:
- /continuous_integration/static_analysis/rules/python-security/file-write-others
- /static_analysis/rules/python-security/file-write-others
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/file-write-others
  language: Python
  severity: Warning
  severity_rank: 2
title: do not let all users write permissions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/file-write-others`

**Language:** Python

**Severity:** Warning

**Category:** Security

**CWE**: [280](https://cwe.mitre.org/data/definitions/280.html)

## Description
Make sure that programs do not let write permissions for all users. When using `os.chmod`, the user should never use `S_IWOTH` that gives the permission to all users to write the file on the filesystem.

Instead, this permission should be removed, and proper control access should be configured.

See the following related CWE:
 - [CWE-275](https://cwe.mitre.org/data/definitions/275.html) category - Permission Issues
 - [CWE-280](https://cwe.mitre.org/data/definitions/280.html) - Improper Handling of Insufficient Permissions or Privileges

## Non-Compliant Code Examples
```python
import stat

path = "/path/to/file"
os.chmod(path, stat.S_IROTH | stat.S_IWOTH | stat.S_IXOTH)
```

## Compliant Code Examples
```python
import stat

path = "/path/to/file"
os.chmod(path, stat.S_IROTH | stat.S_IWOTH | stat.S_IXOTH)  # skipping because it's in a test file
```

```python
import stat

path = "/path/to/file"
os.chmod(path, stat.S_IROTH | stat.S_IXOTH)  # no write by others
```
