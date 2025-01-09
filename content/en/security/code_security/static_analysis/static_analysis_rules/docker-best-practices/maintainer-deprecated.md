---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/maintainer-deprecated
- /static_analysis/rules/docker-best-practices/maintainer-deprecated
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/maintainer-deprecated
  language: Docker
  severity: Notice
  severity_rank: 3
title: The maintainer entry is deprecated
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
