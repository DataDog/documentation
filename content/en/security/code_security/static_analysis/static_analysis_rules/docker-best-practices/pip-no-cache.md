---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/pip-no-cache
- /static_analysis/rules/docker-best-practices/pip-no-cache
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/pip-no-cache
  language: Docker
  severity: Notice
  severity_rank: 3
title: Do not use cache when installing packages
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/pip-no-cache`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
This rule states that Dockerfiles should not use a cache when installing packages. When building Docker images, Docker has a built-in caching mechanism that reuses instructions from previous builds, which can speed up the build process. However, when installing packages, this can lead to outdated packages being used, which might have security vulnerabilities or bugs.

It is important to avoid using a cache when installing packages because it ensures that the latest version of a package is always used. This reduces the risk of security vulnerabilities and bugs, and ensures that your application has the most up-to-date and secure dependencies.

When installing packages with pip in a Dockerfile, use the `--no-cache-dir` option. This tells pip not to use a cache when installing packages, which ensures that the latest version of the package is always used. For example, instead of writing `RUN pip install django`, write `RUN pip install --no-cache-dir django`.

## Non-Compliant Code Examples
```docker
FROM busybox
RUN pip install django
RUN pip3 install django
```

## Compliant Code Examples
```docker
FROM busybox
RUN pip install --no-cache-dir django
```
