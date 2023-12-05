---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: docker-best-practices/expose-admin-ports
  language: Docker
  severity: Warning
title: Do not expose sensitive ports
---
## Metadata
**ID:** `docker-best-practices/expose-admin-ports`

**Language:** Docker

**Severity:** Warning

**Category:** Security

## Description
Never expose admin ports such as the SSH port `22` in your container. It increases the surface of attack of your containers.

## Non-Compliant Code Examples
```docker
FROM debian:jessie
EXPOSE 22
```

## Compliant Code Examples
```docker
FROM debian:jessie
EXPOSE 443
```
