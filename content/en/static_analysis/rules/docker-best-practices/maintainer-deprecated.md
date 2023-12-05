---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/maintainer-deprecated
  language: Docker
  severity: Notice
title: The maintainer entry is deprecated
---
## Metadata
**ID:** `docker-best-practices/maintainer-deprecated`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
Use `LABEL` instead of `MAINTAINER` to report the maintainer of a Dockerfile.

## Non-Compliant Code Examples
```docker
MAINTAINER Jean Bar <jean@bar.fr>
```

## Compliant Code Examples
```docker
LABEL maintainer="Jean Bar <jean@bar.fr>"
```
