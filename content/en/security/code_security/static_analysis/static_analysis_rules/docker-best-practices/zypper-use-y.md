---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/zypper-use-y
- /static_analysis/rules/docker-best-practices/zypper-use-y
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Best Practices
  id: docker-best-practices/zypper-use-y
  language: Docker
  severity: Warning
  severity_rank: 2
title: Always use -y with zypper install
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/zypper-use-y`

**Language:** Docker

**Severity:** Warning

**Category:** Best Practices

## Description
When using `zypper` to install a package, make sure you use the `-y` flag to avoid your CI being blocked on a prompt.


## Non-Compliant Code Examples
```docker
RUN zypper install httpd-2.4.46

```

## Compliant Code Examples
```docker
RUN zypper install -y httpd-2.4.46
```
