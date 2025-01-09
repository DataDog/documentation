---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/multiple-entrypoint
- /static_analysis/rules/docker-best-practices/multiple-entrypoint
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/multiple-entrypoint
  language: Docker
  severity: Notice
  severity_rank: 3
title: Do not use multiple ENTRYPOINT
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/multiple-entrypoint`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
Do not use multiple `ENTRYPOINT` instructions, only the last one is used.

## Non-Compliant Code Examples
```docker
FROM awesomeimage
ENTRYPOINT /foo/bar
ENTRYPOINT /foo/baz
```

## Compliant Code Examples
```docker
FROM awesomeimage
ENTRYPOINT /foo/bar
```
