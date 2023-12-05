---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/too-many-while
  language: Python
  severity: Warning
title: do not use too many nested loops and conditions
---
## Metadata
**ID:** `python-best-practices/too-many-while`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
A program should have a maximum level of nesting loops. If your program has too many nested loops (`if`/`for`/`while`), consider refactoring your program to avoid too many nesting levels.

## Non-Compliant Code Examples
```python
while bla:
    while foo:
        while bar:
            while baz:
                pass

```

## Compliant Code Examples
```python
while bla:
    while foo:
        while bar:
            pass

```
