---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/invalid-assert
- /static_analysis/rules/python-best-practices/invalid-assert
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/invalid-assert
  language: Python
  severity: Notice
  severity_rank: 3
title: Avoid invalid assert
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/invalid-assert`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
In Python, non-empty strings and non-empty tuples are considered `True` in a boolean context. Therefore, `assert "Something bad happened"` and `assert (foo, bar)` will always evaluate to `True`, even if `foo` and `bar` are `False` or `None`. This means that these assertions will never fail and are therefore invalid.

To avoid this, make sure that the expression after the `assert` keyword is a boolean expression that can evaluate to either `True` or `False`. For example, instead of `assert "Something bad happened"`, you could use `assert foo is not None, "Something bad happened"`. This will raise an `AssertionError` with the message "Something bad happened" if `foo` is `None`. Similarly, instead of `assert (foo, bar)`, you could use `assert foo == bar` to check if `foo` and `bar` are equal.

## Non-Compliant Code Examples
```python
assert "Something bad happened"
assert (foo, bar)
```

## Compliant Code Examples
```python
assert foo == bar
assert booleanValue
assert portId.isnumeric(), "portId must be numeric"
```
