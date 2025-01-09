---
aliases:
- /continuous_integration/static_analysis/rules/python-security/avoid-random
- /static_analysis/rules/python-security/avoid-random
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/avoid-random
  language: Python
  severity: Error
  severity_rank: 1
title: use secrets package over random package
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/avoid-random`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [330](https://cwe.mitre.org/data/definitions/330.html)

## Description
Make sure to use values that are *actually* random. The `random` module in Python should generally not be used and replaced with the `secrets` module, as noted in the [official Python documentation](https://docs.python.org/3/library/random.html).

#### Learn More

 - [CWE-330](https://cwe.mitre.org/data/definitions/330.html)
 - [Python random module documentation](https://docs.python.org/3/library/random.html)
 - [Python secrets module documentation](https://docs.python.org/3/library/secrets.html#module-secrets)

## Non-Compliant Code Examples
```python
from random import randrange

randrange(10) # # randrange is not actually random
```

```python
from random import random

v = random() # random is not actually random
```

```python
import random

n = random.randrange(10) # randrange is not actually random
```

```python
import random

n = random.random(1) # randrange is not actually random
```

```python
import random

n = random.random() # randrange is not actually random
```

## Compliant Code Examples
```python
n = random.random()
```
