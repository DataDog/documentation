---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/logging-no-format
  language: Python
  severity: Notice
title: do not use format string with logging functions
---
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

logging.info("error {0}".format(plop))  # use instead logging.info("error %s", plop)
```

## Compliant Code Examples
```python
import logging

logging.info("wfwef")
```
