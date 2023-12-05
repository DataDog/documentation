---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/comment-fixme-todo-ownership
  language: Python
  severity: Notice
title: TODO and FIXME comments must have ownership
---
## Metadata
**ID:** `python-best-practices/comment-fixme-todo-ownership`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
When using `TODO` or `FIXME`, specify who write the annotation. It's a best practice to remind you who created the annotation and have potential context and information about this issue.

## Non-Compliant Code Examples
```python
# TODO fix this function
def my_function():
    pass

# FIXME fix this function
def my_function():
    pass
```

## Compliant Code Examples
```python
# TODO(bob) fix this function
def my_function():
    pass

# FIXME(julien) fix this function
def my_other_function():
    pass

# FIXME[julien] fix this function
def my_other_function():
    pass

# TODO[bob] fix this function
def my_function():
    pass
```
