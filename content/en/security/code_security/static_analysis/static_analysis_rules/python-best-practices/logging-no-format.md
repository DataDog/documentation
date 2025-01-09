---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/logging-no-format
- /static_analysis/rules/python-best-practices/logging-no-format
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/logging-no-format
  language: Python
  severity: Notice
  severity_rank: 3
title: do not use format string with logging functions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/logging-no-format`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Avoid using format string with the `format` method when logging information.

## Non-Compliant Code Examples
```python
import logging
import shlex

logging.info("error {0} {1}".format(plop, plip))  # use instead logging.info("error %s", plop)
```

## Compliant Code Examples
```python
import logging

logging.info("wfwef")
```
