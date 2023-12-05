---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-pandas/arith-operator-not-functions
  language: Python
  severity: Notice
title: Use arithmetic operator instead of a function
---
## Metadata
**ID:** `python-pandas/arith-operator-not-functions`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
User should use arithmetic operators (`+`, `-`, etc) instead of function (`.add`) to make the code more clear.

## Non-Compliant Code Examples
```python
def myfunction():
    foo = pd.DataFrame({'angles': [0, 3, 4],
                        'degrees': [360, 180, 360]},
                        index=['circle', 'triangle', 'rectangle'])
    if something:
        baz = foo.add(1)
    elif other_thing:
        baz = foo.add(42)
    else:
        baz = foo.add(51)

    bar = whatever()
    baz = bar.add(4)
```

```python
def myfunction():
    foo = pd.DataFrame({'angles': [0, 3, 4],
                        'degrees': [360, 180, 360]},
                        index=['circle', 'triangle', 'rectangle'])
    baz = foo.add(1)

    bar = whatever()
    baz = bar.add(4)
```

## Compliant Code Examples
```python
foo = pd.DataFrame({'angles': [0, 3, 4],
                   'degrees': [360, 180, 360]},
                  index=['circle', 'triangle', 'rectangle'])
baz = foo + 1


```
