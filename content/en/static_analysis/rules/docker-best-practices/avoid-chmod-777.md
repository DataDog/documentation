---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: docker-best-practices/avoid-chmod-777
  language: Docker
  severity: Warning
title: Do not give wide permissions on files
---
## Metadata
**ID:** `docker-best-practices/avoid-chmod-777`

**Language:** Docker

**Severity:** Warning

**Category:** Security

## Description
Make sure you do not give too many permissions with copying or adding a file. Adding write permissions to all means that any other users may modify the files.


## Non-Compliant Code Examples
```docker
ADD --chmod=777 src dst
COPY --chmod=777 src dst
```

## Compliant Code Examples
```docker
ADD --chmod=755 src dst
COPY --chmod=755 src dst
```
