---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception
- /static_analysis/rules/python-best-practices/no-silent-exception
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-silent-exception
  language: Python
  severity: Error
  severity_rank: 1
title: Do not ignore Exception with a pass statement
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/no-silent-exception`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Using the `pass` statement in an exception block ignores the exception. Exceptions should never be ignored. Instead, the user must add code to notify an exception occurred and attempt to handle it or recover from it.

The exception to this rule is the use of `StopIteration` or `StopAsyncIteration` when implementing a custom iterator (as those errors are used to acknowledge the end of a successful iteration).

## Non-Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a / b
except Exception as e:
  pass  # should use a regular statement and not ignore the exception
```

## Compliant Code Examples
```python
a = 2
b = 0
try:
  c = a / b
except ZeroDivisionError as e:
  print(e)
  pass

try:
  do_iteration()
except StopIteration: # Handling the iterator's successful conclusion is OK
  pass

try:
  do_async_iteration()
except StopAsyncIteration: # Handling the iterator's successful conclusion is OK
  pass
```
