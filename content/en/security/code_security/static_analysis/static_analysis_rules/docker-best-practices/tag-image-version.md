---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/tag-image-version
- /static_analysis/rules/docker-best-practices/tag-image-version
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/tag-image-version
  language: Docker
  severity: Warning
  severity_rank: 2
title: Always tag the version of an image
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/tag-image-version`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
This rule dictates that Docker images should always be tagged with a specific version number. In Docker, an image tag represents a particular version of an image. The use of tags allows developers to have better control over which versions of an image are being used in their projects. 

This is crucial because it ensures the consistency and reliability of the Docker environment. If an image is not tagged, Docker defaults to using the 'latest' version of the image. However, the 'latest' tag does not guarantee that the same version of an image will be used every time, which can lead to unexpected behavior or compatibility issues.

To comply with this rule, always specify a version number when pulling a Docker image. Instead of `FROM debian`, write `FROM debian:unstable` or `FROM debian:10.3`. This ensures that you are using a specific version of the image, providing a more predictable and stable environment for your project.

## Non-Compliant Code Examples
```docker
FROM debian

```

## Compliant Code Examples
```docker
FROM scratch
ADD hello /
CMD ["/hello"]
```

```docker
FROM ${IMAGE}

```

```docker
FROM debian:unstable as base

FROM base as final
```
