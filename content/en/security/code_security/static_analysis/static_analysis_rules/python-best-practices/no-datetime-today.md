---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today
- /static_analysis/rules/python-best-practices/no-datetime-today
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-datetime-today
  language: Python
  severity: Notice
  severity_rank: 3
title: do not use datetime.today()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-datetime-today`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using `datetime.today()` and use instead `datetime.now()`. The two calls are equivalent (as mentioned in the [official documentation](https://docs.python.org/3/library/datetime.html#datetime.date.today)) and the use of `now()` is more explicit than `today()`.

Using `today()` makes you think it only returns the year/month/day but it returns a full timestamp. For this reason, prefer using `now()`.

## Non-Compliant Code Examples
```python
from datetime import datetime
print("foo")
bla = datetime.today()  # use datetime.now() instead
```

## Compliant Code Examples
```python
from datetime import datetime
print("foo")
bla = datetime.now()
```
