---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/apt-pin-version
- /static_analysis/rules/docker-best-practices/apt-pin-version
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/apt-pin-version
  language: Docker
  severity: Notice
  severity_rank: 3
title: Always pin versions in apt-get install
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/apt-pin-version`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
When using `apt-get install`, pin the version to avoid unwanted upgrades and undefined behavior.

## Non-Compliant Code Examples
```docker
FROM debian:12

RUN set -eux; \
    apt-get update; \
    apt-get install -y curl git gcc g++ make cmake; \
    rm -rf /var/cache/apt/archives /var/lib/apt/lists/*
```

```docker
FROM debian:12
RUN apt-get install python

RUN apt-get update && \
    apt-get install -y --no-install-recommends openjdk-19-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/ /var/cache/oracle*


```

## Compliant Code Examples
```docker
FROM debian:12
RUN apt-get install python=3.11
```
