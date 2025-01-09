---
aliases:
- /continuous_integration/static_analysis/rules/python-inclusive/function-definition
- /static_analysis/rules/python-inclusive/function-definition
dependencies: []
disable_edit: true
group_id: python-inclusive
meta:
  category: Code Style
  id: python-inclusive/function-definition
  language: Python
  severity: Notice
  severity_rank: 3
title: check function names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-inclusive/function-definition`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that some words are not used in the codebase and suggest replacement when appropriate.

Examples of replacement suggestions:
 - `blacklist` with `denylist`
 - `whitelist` with `allowlist`
 - `master` with `primary`
 - `slave` with `secondary`

## Non-Compliant Code Examples
```python
# blacklist located at the end of the string
def foo_blacklist():
    pass
```

```python
# Do not use the name blacklist, even if casing is mixed
def BlaCKliSt_NaMeS():
    pass

def wHiTeLisT_NaMeS():
    pass
```

```python
# blacklist at the beginning of the function name
def blacklist_names():
    pass
```

```python
# wrong identifier in the function name and parameters
def blacklist_names(master, slave):
    pass
```

## Compliant Code Examples
```python
def foo_denylist():
    pass
```
