---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/absolute-workdir
  language: Docker
  severity: Warning
title: Use absolute workdir
---
## Metadata
**ID:** `docker-best-practices/absolute-workdir`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using a relative `WORKDIR`, you may run into problems since you are dependent on previous `WORKDIR` instructions. Using an absolute `WORKDIR` ensures you have the right path no matter where the instruction is positioned.

## Non-Compliant Code Examples
```docker
FROM busybox
WORKDIR usr/src/app
```

## Compliant Code Examples
```docker
FROM busybox
WORKDIR /usr/src/app
```
