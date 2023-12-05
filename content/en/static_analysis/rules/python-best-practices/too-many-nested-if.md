---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/too-many-nested-if
  language: Python
  severity: Warning
title: do not use too many nested if conditions
---
## Metadata
**ID:** `python-best-practices/too-many-nested-if`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Too many nested loops make the code hard to read and understand. Simplify your code by removing nesting levels and separate code in small units.

## Non-Compliant Code Examples
```python
if foo:
    if bar:
        if baz:
            if bao:
                pass
```

## Compliant Code Examples
```python
if foo:
    if bar:
        if baz:
            pass
```
