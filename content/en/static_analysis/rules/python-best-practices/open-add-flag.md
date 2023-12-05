---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/open-add-flag
  language: Python
  severity: Error
title: do not define an open flag for reading
---
## Metadata
**ID:** `python-best-practices/open-add-flag`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
If a flag is opened for read-only, no need to put a flag to open the file.


#### Learn More

 - [Python documentation: `open()`](https://docs.python.org/3/library/functions.html#open)

## Non-Compliant Code Examples
```python
def print_foo():
  with open("myfile.txt", "r") as myfile:  # no need to specify the "r" flag
    content = myfile.read()

  with open(path, "rb") as f:
    for chunk in iter(lambda: f.read(4096), b""):
        hasher.update(chunk)
```

## Compliant Code Examples
```python
def print_foo():
  with open("myfile.txt") as myfile:
    content = myfile.read()
```
