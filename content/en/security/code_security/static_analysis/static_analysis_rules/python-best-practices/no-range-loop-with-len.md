---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len
- /static_analysis/rules/python-best-practices/no-range-loop-with-len
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/no-range-loop-with-len
  language: Python
  severity: Error
  severity_rank: 1
title: Do not use for i in range(len(<array>))
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
import random
import string

DEFAULT_CHAR_STRING = string.ascii_lowercase + string.digits


def generate_random_string(chars=DEFAULT_CHAR_STRING, size=20):
    return "".join(random.choice(chars) for _ in range(size))


NORMALIZED_SIZE = 8


def normalize(s):
    builder = []
    for i in range(NORMALIZED_SIZE):
        builder.append(s[i].capitalize())
    return "".join(builder)


FORBIDDEN_WORDS = set(["bad1", "bad2"])


def filter_forbidden_tags(tags):
    for i in range(len(tags)):
        if tags[i].tag in FORBIDDEN_WORDS:
            del tags[i]
    return tags
```

```python
for i in range(len(tab)):  # iterate directly over the array
  bla(tab[i])
```

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
for i, _ in enumerate(lst):
   print(i)

for i in range(len(lst)):
   print(i)
   plop = tab[i]
```

```python
for i in tab:
  bla(i)
```
