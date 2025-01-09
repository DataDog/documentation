---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/expose-valid-port
- /static_analysis/rules/docker-best-practices/expose-valid-port
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/expose-valid-port
  language: Docker
  severity: Notice
  severity_rank: 3
title: Expose a valid UNIX port number
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/expose-valid-port`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
The `EXPOSE` instruction should take a valid UNIX port range.

## Non-Compliant Code Examples
```docker
EXPOSE 1001232323
```

## Compliant Code Examples
```docker
EXPOSE 8080
```
