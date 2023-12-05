---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-range-loop-with-len
  language: Python
  severity: Error
title: Do not use for i in range(len(<array>))
---
## Metadata
**ID:** `python-best-practices/no-range-loop-with-len`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Do not iterate over an array using `for in range(len(array))`. Use instead `for i in array`.

#### Learn More

 - [Python Loop Through an Array](https://www.w3schools.com/python/gloss_python_array_loop.asp)

## Non-Compliant Code Examples
```python
for i in range(len(tab)):  # iterate directly over the array
  bla(tab[i])
```

```python
for i in range(len(tab)):  # iterate directly over the array
  tab[i] = bla
```

## Compliant Code Examples
```python
for i in tab:
  bla(i)
```
