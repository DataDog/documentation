---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/avoid-duplicate-keys
  language: Python
  severity: Warning
title: Avoid duplicate keys in dictionaries
---
## Metadata
**ID:** `python-best-practices/avoid-duplicate-keys`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Keys in a dictionary must be unique.

## Non-Compliant Code Examples
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
  "key1": "bla"
}

```

## Compliant Code Examples
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
}

```
