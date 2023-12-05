---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/pip-no-cache
  language: Docker
  severity: Notice
title: Do not use cache when installing packages
---
## Metadata
**ID:** `docker-best-practices/pip-no-cache`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
When installing Python packages with `pip`, always pin the version.

## Non-Compliant Code Examples
```docker
FROM busybox
RUN pip install django
RUN pip3 install django
```

## Compliant Code Examples
```docker
FROM busybox
RUN pip install --no-cache-dir django
```
