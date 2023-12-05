---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-inclusive/comments
  language: Python
  severity: Notice
title: check comments for wording issues
---
## Metadata
**ID:** `python-inclusive/comments`

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
# whitelist names to prevent unauthorized usage
def filter_names(names):
    pass

# she SHE should check her code    
def new_function_from_helen():
    pass


class Foo:
    # he should check his
    def new_function_from_joe():
        pass
```

## Compliant Code Examples
```python
# allowlist names to prevent unauthorized usage
def filter_names(names):
    pass

# the comments do not have an history of issues
def foo(bar):
    baz()
```
