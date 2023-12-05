---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/apt-get-yes
  language: Docker
  severity: Warning
title: Always use -y with apt-get install
---
## Metadata
**ID:** `docker-best-practices/apt-get-yes`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `apt-get` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.

## Non-Compliant Code Examples
```docker
RUN apt-get install gcc
```

## Compliant Code Examples
```docker
RUN apt-get install -y gcc
```
