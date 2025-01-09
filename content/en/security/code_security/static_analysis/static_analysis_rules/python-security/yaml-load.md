---
aliases:
- /continuous_integration/static_analysis/rules/python-security/yaml-load
- /static_analysis/rules/python-security/yaml-load
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/yaml-load
  language: Python
  severity: Warning
  severity_rank: 2
title: avoid deserializing untrusted YAML
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/yaml-load`

**Language:** Python

**Severity:** Warning

**Category:** Security

**CWE**: [502](https://cwe.mitre.org/data/definitions/502.html)

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
