---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/zypper-use-y
  language: Docker
  severity: Warning
title: Always use -y with zypper install
---
## Metadata
**ID:** `docker-best-practices/zypper-use-y`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `zypper` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.


## Non-Compliant Code Examples
```docker
RUN zypper install httpd-2.4.46

```

## Compliant Code Examples
```docker
RUN zypper install -y httpd-2.4.46
```
