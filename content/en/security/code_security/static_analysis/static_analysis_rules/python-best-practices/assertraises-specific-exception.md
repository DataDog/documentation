---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/assertraises-specific-exception
- /static_analysis/rules/python-best-practices/assertraises-specific-exception
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/assertraises-specific-exception
  language: Python
  severity: Warning
  severity_rank: 2
title: assertRaises must check for a specific exception
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
