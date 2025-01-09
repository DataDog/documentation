---
aliases:
- /continuous_integration/static_analysis/rules/python-security/no-empty-list-as-parameter
- /static_analysis/rules/python-security/no-empty-list-as-parameter
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/no-empty-list-as-parameter
  language: Python
  severity: Warning
  severity_rank: 2
title: Do not use an empty list as a default parameter
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/no-empty-list-as-parameter`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
Developers should not be setting a default argument to an empty list. Instead, use `None` and check if the value is defined. Using a default list can cause unwanted behavior as the value of the argument is only evaluated once when the function is defined, not when it is run. Because of this, each function call will reference the same underlying memory when the default value is used, which can lead to unwanted behavior.

### Learn More

 - [Avoid using empty list as default argument](https://nikos7am.com/posts/mutable-default-arguments/)

## Non-Compliant Code Examples
```python
def newFunction(arg1, arg2: int, arg3 = [], arg4: MyType = []): # do not use an empty list as a default parameter
    arg3.append(arg2)
    arg4.append(arg1)
    print(arg3, arg4)

newFunction('a', 1)
newFunction('b', 2)
newFunction('c', 3)

# Will print:
# [1] ['a']
# [1, 2] ['a', 'b']
# [1, 2, 3] ['a', 'b', 'c']
```

## Compliant Code Examples
```python
def newFunction(arg1, arg2: int, arg3 = None, arg4 = None): # do not use an empty list as a default parameter
    if arg3 is None:
        arg3 = []
    if arg4 is None:
        arg4 = []
    arg3.append(arg2)
    arg4.append(arg1)
    print(arg3, arg4)

newFunction('a', 1)
newFunction('b', 2)
newFunction('c', 3)

# Will print:
# [1] ['a']
# [2] ['b']
# [3] ['c']
```
