---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/tag-image-version
  language: Docker
  severity: Warning
title: Always tag the version of an image
---
## Metadata
**ID:** `docker-best-practices/tag-image-version`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
Always tag the version of an image. You can never assume that `latest` is a specific version.

## Non-Compliant Code Examples
```docker
FROM debian

```

## Compliant Code Examples
```docker
FROM debian:unstable

```
