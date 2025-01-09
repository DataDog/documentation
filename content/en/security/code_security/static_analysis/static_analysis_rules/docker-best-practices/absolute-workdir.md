---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/absolute-workdir
- /static_analysis/rules/docker-best-practices/absolute-workdir
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/absolute-workdir
  language: Docker
  severity: Warning
  severity_rank: 2
title: Use absolute workdir
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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

WORKDIR $MYWORKDIR
```
