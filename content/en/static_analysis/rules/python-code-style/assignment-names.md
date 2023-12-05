---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-code-style/assignment-names
  language: Python
  severity: Error
title: variable names must use snake_case
---
## Metadata
**ID:** `python-code-style/assignment-names`

**Language:** Python

**Severity:** Error

**Category:** Code Style

## Description
Ensure that variable names use `snake_case` and not `camelCase`.

#### Learn More

- [PEP8 - Naming Style](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## Non-Compliant Code Examples
```python
fooBar = foobar()
```

```python
firstVariable, secondVariable = functioncall()
```

## Compliant Code Examples
```python
hello = 1
```

```python
fooBAr = foobar()
```
