---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: docker-best-practices/no-root-user
  language: Docker
  severity: Warning
title: Last user should not be root
---
## Metadata
**ID:** `docker-best-practices/no-root-user`

**Language:** Docker

**Severity:** Warning

**Category:** Security

## Description
Do not use `root` as the last user because your container runs with the `root` user. Always use a user with lower privileges.

## Non-Compliant Code Examples
```docker
CMD foo
USER plop
CMD plip
USER root
```

## Compliant Code Examples
```docker
CMD foo
USER root
CMD plip
USER normaluser
```
