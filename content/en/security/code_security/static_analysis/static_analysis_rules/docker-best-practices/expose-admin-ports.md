---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/expose-admin-ports
- /static_analysis/rules/docker-best-practices/expose-admin-ports
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Security
  id: docker-best-practices/expose-admin-ports
  language: Docker
  severity: Warning
  severity_rank: 2
title: Do not expose sensitive ports
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
