---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/dataclass-special-methods
- /static_analysis/rules/python-best-practices/dataclass-special-methods
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/dataclass-special-methods
  language: Python
  severity: Notice
  severity_rank: 3
title: do not use special method on data class
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/dataclass-special-methods`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Data classes (annotated with `@dataclass`) do not use special methods, such as `__init__`, `__gt__`, and others.

## Non-Compliant Code Examples
```python
@dataclass
class _Leaf(Generic[T]):
    parent: _Leaf
    value: T

    def __init__(self, value: Optional[T] = None):
        self.value = value
        self.parent = self

    def update(self, value: T):
        self.value = value
        return self

    def __lt__(self, other: _Leaf):
        return repr(self) < repr(other)

    def __gt__(self, other: _Leaf):
        return repr(self) > repr(other)

    # __eq__ should not be used
    def __eq__(self, other: _Leaf):
        return repr(self) == repr(other)

    def __repr__(self):
        return self.value
```

## Compliant Code Examples
```python
@dataclass
class _Leaf(Generic[T]):
    parent: _Leaf
    value: T

    def update(self, value: T):
        self.value = value
        return self

    def __repr__(self):
        return self.value
```
