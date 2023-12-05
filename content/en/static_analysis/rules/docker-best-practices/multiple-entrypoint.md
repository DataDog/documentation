---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/multiple-entrypoint
  language: Docker
  severity: Notice
title: Do not use multiple CMD
---
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
