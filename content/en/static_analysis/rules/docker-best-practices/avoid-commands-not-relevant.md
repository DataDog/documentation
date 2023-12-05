---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/avoid-commands-not-relevant
  language: Docker
  severity: Notice
title: Avoid commands not made for containers
---
## Metadata
**ID:** `docker-best-practices/avoid-commands-not-relevant`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
Some commands do not make sense to use when building a container. They require user inputs which cannot work when building a container. Avoid such commands in a Dockerfile.

## Non-Compliant Code Examples
```docker
FROM busybox
RUN top
RUN vim
```

## Compliant Code Examples
```docker
FROM busybox
RUN mycommand foo bar
```
