---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice
- /static_analysis/rules/python-best-practices/import-modules-twice
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/import-modules-twice
  language: Python
  severity: Warning
  severity_rank: 2
title: module imported twice
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/import-modules-twice`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Always define a module once. Do not import the module multiple times and/or import the module using different methods. It makes the code harder to understand. Import a module once and for all with only one import mechanism.

## Non-Compliant Code Examples
```python
import logging
import logging  # do not import the same module again.

```

## Compliant Code Examples
```python
import typing
from typing import cast
```

```python
import logging
```

```python
import logging
from logging import foo # not an issue since we are using a from import

```
