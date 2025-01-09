---
aliases:
- /continuous_integration/static_analysis/rules/python-security/ruamel-unsafe-yaml
- /static_analysis/rules/python-security/ruamel-unsafe-yaml
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/ruamel-unsafe-yaml
  language: Python
  severity: Error
  severity_rank: 1
title: Do not use insecure YAML deserialization
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/ruamel-unsafe-yaml`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

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
