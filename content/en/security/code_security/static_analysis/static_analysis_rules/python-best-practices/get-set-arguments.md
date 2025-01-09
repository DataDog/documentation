---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/get-set-arguments
- /static_analysis/rules/python-best-practices/get-set-arguments
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/get-set-arguments
  language: Python
  severity: Warning
  severity_rank: 2
title: getter/setter must have 1 or 2 arguments respectively
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/get-set-arguments`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Ensure that getter and setter have the right number of parameters:
 - getters must have exactly one parameter (the instance we are reading from)
 - setters must have exactly two parameters (the instance we are updating and the associated value)

#### Learn More

 - [Python documentation - property](https://docs.python.org/3/library/functions.html#property)

## Non-Compliant Code Examples
```python
class Foo:
   @property
   def get_my_attribute(self, foo):  # getter should have only one argument
      return self.my_attribute
   
   @attr.setter
   def set_attr(self, v, bar):  # setter should have only two arguments
      self._attr = v

   @attr.deleter
   def del_attr(self, foo):  # deleter should have only one argument
      del self._attr
```

## Compliant Code Examples
```python
class Foo:
   def get_my_attribute(self):
      return self.my_attribute
   
   def get_my_attribute(self, foo): # Not a property or attr, valid
      return self.my_attribute

   @property
   def get_my_attribute(self):
      return self.my_attribute

   def set_my_attribute(self, v):
      self.my_attribute = v

   @attr.setter
   def set_attr(self, v):
      self._attr = v

   @attr.deleter
   def del_attr(self,):
      return self._attr
```
