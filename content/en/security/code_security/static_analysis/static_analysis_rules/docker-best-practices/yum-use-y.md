---
aliases:
- /code_analysis/static_analysis_rules/docker-best-practices/yum-use-y
- /continuous_integration/static_analysis/rules/docker-best-practices/yum-use-y
- /static_analysis/rules/docker-best-practices/yum-use-y
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/yum-use-y
  language: Docker
  severity: Warning
  severity_rank: 2
title: Always use -y with yum install
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/yum-use-y`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `yum` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.

## Non-Compliant Code Examples
```docker
RUN yum install gcc
```

## Compliant Code Examples
```docker
RUN yum install -y gcc
```
