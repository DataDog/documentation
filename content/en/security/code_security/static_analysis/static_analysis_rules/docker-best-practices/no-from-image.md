---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/no-from-image
- /static_analysis/rules/docker-best-practices/no-from-image
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/no-from-image
  language: Docker
  severity: Warning
  severity_rank: 2
title: Dockerfiles should specify a base image
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/no-from-image`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
The rule stipulates that all Dockerfiles must specify a base image. This is important because without specifying a base image, you are building a container from scratch, and this is likely what is not intended.

To avoid violating this rule, always declare a base image at the start of your Dockerfile using the `FROM` keyword. For example, `FROM ubuntu:18.04` sets the base image to Ubuntu 18.04.

## Non-Compliant Code Examples
```docker
RUN echo "hello"
```

## Compliant Code Examples
```docker
FROM image as base

# foo

FROM image2
```
