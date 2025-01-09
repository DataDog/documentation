---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments
- /static_analysis/rules/python-best-practices/special-methods-arguments
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/special-methods-arguments
  language: Python
  severity: Error
  severity_rank: 1
title: ensure special methods have the correct arguments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/special-methods-arguments`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
For all special methods for a class (`__add__`, `__sub__`, and more) make sure the method has the correct number of arguments.

## Non-Compliant Code Examples
```python
class GFG:
  
    def __init__(self, val):
        self.val = val
          
    def __next__(self, val2, val3): # invalid, we should have only one argument.
        return GFG(self.val + val2.val)
```

```python
class GFG:
  
    def __init__(self, val):
        self.val = val
          
    def __add__(self, val2, val3): # we should have only two arguments.
        return GFG(self.val + val2.val)
```

## Compliant Code Examples
```python
class GFG:
  
    def __init__(self, val):
        self.val = val
          
    def __add__(self, val2):
        return GFG(self.val + val2.val)
```
