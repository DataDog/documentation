---
aliases:
- /continuous_integration/static_analysis/rules/python-security/jinja-autoescape
- /static_analysis/rules/python-security/jinja-autoescape
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/jinja-autoescape
  language: Python
  severity: Notice
  severity_rank: 3
title: Auto escape should be set to true
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/jinja-autoescape`

**Language:** Python

**Severity:** Notice

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
By default, jinja2 is not autoescaping. This can lead to XSS attacks. The `autoescape` parameter should always be `True`.


#### Learn More

 - [OWASP XSS](https://owasp.org/www-community/attacks/xss/)
 - [CWE-94 - Improper Control of Generation of Code](https://cwe.mitre.org/data/definitions/94.html)

## Non-Compliant Code Examples
```python
import jinja2
env = jinja2.Environment(
    loader=PackageLoader("yourapp"),
    autoescape=False # should be True
)
```

```python
from jinja2 import Environment, PackageLoader, select_autoescape
env = Environment(
    loader=PackageLoader("yourapp"),
    autoescape=False # should be True
)
```

## Compliant Code Examples
```python
import jinja2
env = Environment(
    loader=PackageLoader("yourapp"),
    autoescape=True
)
```

```python
from jinja2 import Environment, PackageLoader, select_autoescape
env = Environment(
    loader=PackageLoader("yourapp"),
    autoescape=select_autoescape()
)
```

```python
from jinja2 import Environment, PackageLoader, select_autoescape
env = Environment(
    loader=PackageLoader("yourapp"),
    autoescape=True
)
```
