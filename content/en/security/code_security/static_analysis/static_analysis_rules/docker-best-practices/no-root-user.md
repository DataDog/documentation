---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/no-root-user
- /static_analysis/rules/docker-best-practices/no-root-user
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Security
  id: docker-best-practices/no-root-user
  language: Docker
  severity: Warning
  severity_rank: 2
title: Last user should not be root
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
