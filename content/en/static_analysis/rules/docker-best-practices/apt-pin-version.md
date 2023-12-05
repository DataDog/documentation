---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/apt-pin-version
  language: Docker
  severity: Notice
title: Always pin versions in apt-get install
---
## Metadata
**ID:** `docker-best-practices/apt-pin-version`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
When using `apt-get install`, pin the version to avoid unwanted upgrades and undefined behavior.

## Non-Compliant Code Examples
```docker
FROM busybox
RUN apt-get install python

RUN apt-get update && \
    apt-get install -y --no-install-recommends openjdk-19-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/ /var/cache/oracle*
```

## Compliant Code Examples
```docker
FROM busybox
RUN apt-get install python=3.11
```
