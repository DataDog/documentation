---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/multiple-healthcheck
  language: Docker
  severity: Notice
title: Do not use multiple HEALTHCHECK
---
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
