---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/yaml-load
  language: Python
  severity: Warning
title: avoid deserializing untrusted YAML
---
## Metadata
**ID:** `python-security/yaml-load`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
Avoid deserialization of untrusted YAML data via potential unsafe `yaml.load`.

This rule checks that the `yaml` module is used and the `load` method is used. It recommends the usage of `safe_load` that prevents unsafe deserialization.

**See Also**

 - [CWE-502 - Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)

## Non-Compliant Code Examples
```python
from yaml import load

load("string") # should use safe_load
```

```python
import yaml

yaml.load("string") # should use safe_load
```

## Compliant Code Examples
```python
import yaml

yaml.load("string", loader=yaml.SafeLoader) # uses SafeLoader, so load is okay
```

```python
yaml.load("string")
```
