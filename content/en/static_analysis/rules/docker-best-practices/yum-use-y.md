---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/yum-use-y
  language: Docker
  severity: Warning
title: Always use -y with yum install
---
## Metadata
**ID:** `docker-best-practices/yum-use-y`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `yum` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.

## Non-Compliant Code Examples
```docker
RUN yum install gcc
```

## Compliant Code Examples
```docker
RUN yum install -y gcc
```
