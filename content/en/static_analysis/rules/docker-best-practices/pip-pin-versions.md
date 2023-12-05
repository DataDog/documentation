---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/pip-pin-versions
  language: Docker
  severity: Notice
title: Always pin versions with pip
---
## Metadata
**ID:** `docker-best-practices/pip-pin-versions`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
When installing Python packages with `pip`, always pin the version.

## Non-Compliant Code Examples
```docker
FROM busybox
RUN pip install django
```

## Compliant Code Examples
```docker
FROM busybox
RUN pip install django==1.9
```
