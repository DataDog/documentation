---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/dnf-use-y
  language: Docker
  severity: Warning
title: Always use -y with dnf install
---
## Metadata
**ID:** `docker-best-practices/dnf-use-y`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `dnf` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.

## Non-Compliant Code Examples
```docker
RUN dnf install httpd-2.4.46
```

## Compliant Code Examples
```docker
RUN dnf install -y httpd-2.4.46
```
