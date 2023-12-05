---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/no-double-not
  language: Python
  severity: Warning
title: do not use double negation
---
## Metadata
**ID:** `python-best-practices/no-double-not`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
Do not use two negation. It makes the code more complex to read and understand. Instead of using two negation, use the expression directly.

## Non-Compliant Code Examples
```python
if not not foo:  # just use if foo
	pass
```

## Compliant Code Examples
```python
if not foo:
	pass
```
