---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/ruamel-unsafe-yaml
  language: Python
  severity: Error
title: Do not use insecure YAML deserialization
---
## Metadata
**ID:** `python-security/ruamel-unsafe-yaml`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Unsafe YAML deserialization. Make sure to use safe deserialization methods to avoid execution or arbitrary code.

#### Learn More

 - [ruamel.yaml documentation](https://yaml.readthedocs.io/en/latest/basicuse.html?highlight=typ)
 - [CWE 502 - Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)

## Non-Compliant Code Examples
```python
from ruamel.yaml import YAML

foo = YAML(typ='unsafe')

def myfunction(arg):
    bar = YAML(typ='base')
```

## Compliant Code Examples
```python
foo = YAML(typ='unsafe')

def myfunction(arg):
    bar = YAML(typ='base')
```

```python
from ruamel.yaml import YAML

default = YAML()

rt = YAML(typ='rt')

safe = YAML(typ='safe')
```
