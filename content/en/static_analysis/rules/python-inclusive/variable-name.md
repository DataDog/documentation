---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-inclusive/variable-name
  language: Python
  severity: Notice
title: check variable names for wording issues
---
## Metadata
**ID:** `python-inclusive/variable-name`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Check the variable names and suggest better names.

Examples of replacement suggestions:

-   `blacklist` with `denylist`
-   `whitelist` with `allowlist`
-   `master` with `primary`
-   `slave` with `secondary`

## Non-Compliant Code Examples
```python
# banned name, will suggest allowlist
whitelist = "foo"
names_whitelist = "bla";

names_blacklist = "bla";

addr_master_ip = "5.4.3.8";
addr_slave_ip = "1.2.3.4";
```

## Compliant Code Examples
```python
# not a problem with the name
snow_white = "happy"
```
