---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/return-outside-function
- /static_analysis/rules/python-best-practices/return-outside-function
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/return-outside-function
  language: Python
  severity: Notice
  severity_rank: 3
title: do not return outside a function
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/return-outside-function`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
All `return` statements must be within a function. Putting a `return` statement outside of a function may have unexpected behaviors (such as exiting the program early).

## Non-Compliant Code Examples
```python
class Foo:
    return 1  # return must be done within a function
```

```python
def foo():
    return "bar"

return "bar"  # return must be done within a function
```

## Compliant Code Examples
```python
def foobar()
    return 2
```
