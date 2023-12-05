---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/condition-similar-block
  language: Python
  severity: Warning
title: if conditions must have different code blocks
---
## Metadata
**ID:** `python-best-practices/condition-similar-block`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Code in the branches of an `if` condition must be unique. If you have duplicated branches, merge the conditions.

## Non-Compliant Code Examples
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  # same code than the if condition
  printf("bar")
else:
  # same code than the if condition
  printf("bar")
```

## Compliant Code Examples
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  printf("bar3")
else:
  printf("bar4")
```
