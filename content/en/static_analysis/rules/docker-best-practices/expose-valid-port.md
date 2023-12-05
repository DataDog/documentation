---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/expose-valid-port
  language: Docker
  severity: Notice
title: Expose a valid UNIX port number
---
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
