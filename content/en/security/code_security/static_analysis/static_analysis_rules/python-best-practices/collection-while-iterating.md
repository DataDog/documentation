---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/collection-while-iterating
- /static_analysis/rules/python-best-practices/collection-while-iterating
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Error Prone
  id: python-best-practices/collection-while-iterating
  language: Python
  severity: Error
  severity_rank: 1
title: do not modify a dictionary while iterating on it
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/collection-while-iterating`

**Language:** Python

**Severity:** Error

**Category:** Error Prone

## Description
Never update a dictionary while iterating on it. If you wish to update the dictionary, create a new dictionary from the existing values. 

## Non-Compliant Code Examples
```python
i = 0
for element in my_list:
    my_list["stuff"] = i  # modifying a dictionary while iterating
    i += 1
```

## Compliant Code Examples
```python
i = 0
new_list = {}
for element in my_list:
    new_list["stuff"] = i  # putting value to a new dictionary
    i += 1
```
