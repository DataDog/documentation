---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/apt-get-yes
- /static_analysis/rules/docker-best-practices/apt-get-yes
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/apt-get-yes
  language: Docker
  severity: Warning
  severity_rank: 2
title: Always use -y with apt-get install
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/apt-get-yes`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
The rule "Always use -y with apt-get install" is a best practice in Dockerfile development to ensure that the Docker build process is non-interactive. Dockerfiles should be designed to build without requiring any user intervention. By using the `-y` flag with `apt-get install`, you can automatically answer yes to any prompts that the installation process might produce, making the process non-interactive.

This rule is crucial because a Docker build that requires user interaction can cause problems in automated build systems. It can lead to build failures or unexpected results due to lack of user response. This is especially important in CI/CD pipelines where the Docker build process should be fully automated.

To adhere to this rule, always include the `-y` flag when using `apt-get install` in your Dockerfiles. For example, instead of writing `RUN apt-get install gcc`, write `RUN apt-get install -y gcc`. Also, to avoid potential issues with locale settings, you can use `DEBIAN_FRONTEND=noninteractive` in conjunction with `apt-get install`. For instance, `RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y git`.

## Non-Compliant Code Examples
```docker
RUN apt-get install gcc
```

## Compliant Code Examples
```docker
RUN apt-get install -y gcc
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install git
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install git
```
