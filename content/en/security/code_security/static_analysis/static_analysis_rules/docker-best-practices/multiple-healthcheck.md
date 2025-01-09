---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/multiple-healthcheck
- /static_analysis/rules/docker-best-practices/multiple-healthcheck
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/multiple-healthcheck
  language: Docker
  severity: Notice
  severity_rank: 3
title: Do not use multiple HEALTHCHECK
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/multiple-healthcheck`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
A Dockerfile with multiple `HEALTHCHECK` instructions is confusing. A container should only have one `HEALTHCHECK` instruction.

## Non-Compliant Code Examples
```docker
HEALTHCHECK CMD foo
HEALTHCHECK CMD bar
```

## Compliant Code Examples
```docker
HEALTHCHECK CMD foo
```
