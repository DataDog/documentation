---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/any-type-disallow
- /static_analysis/rules/python-best-practices/any-type-disallow
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/any-type-disallow
  language: Python
  severity: Warning
  severity_rank: 2
title: do not use Any type
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/any-type-disallow`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
Use the `Any` type very carefully. Most of the time, the `Any` type is used because we do not know exactly what type is being used. If you want to specify that a value can be of any type, use `object` instead of `Any`.


#### Learn More

 - [Python documentation: the `Any` type](https://docs.python.org/3/library/typing.html#the-any-type)

## Non-Compliant Code Examples
```python
my_var: Any = 1
```

```python
def foo(x: Any):  # do not use Any, use a specific type
   pass
```

## Compliant Code Examples
```python
my_var: int = 1

def my_function(a: str) -> str:
    pass
```
