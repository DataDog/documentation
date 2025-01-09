---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/type-check-isinstance
- /static_analysis/rules/python-best-practices/type-check-isinstance
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/type-check-isinstance
  language: Python
  severity: Notice
  severity_rank: 3
title: use isinstance instead of type
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/type-check-isinstance`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Using `isinstance` is faster than `type` but also consider inheritance, which makes it more accurate.

## Non-Compliant Code Examples
```python
# use isinstance instead of
if type(Foo()) == Foo:
    print("is foo")
```

## Compliant Code Examples
```python
raise ValueError("target %s config %s has type of %s" % (target, config_content, type(config_content)))
```

```python
if isinstance(Bar(), Foo):
    print("foo")
```
