---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: python-best-practices/assertraises-specific-exception
  language: Python
  severity: Warning
title: assertRaises must check for a specific exception
---
## Metadata
**ID:** `python-best-practices/assertraises-specific-exception`

**Language:** Python

**Severity:** Warning

**Category:** Error Prone

## Description
When checking an exception, check for a specific exception. Checking for `Exception` may bypass the verification of the correct behavior of the program.

Using a generic exception is error-prone and give a false sense of correctness. Instead,  use the correct exception to check against.

## Non-Compliant Code Examples
```python
self.assertRaises(Exception, foo)  # check a specific Exception, not a generic one
```

## Compliant Code Examples
```python
self.assertRaises(ValueError, foo)
```
