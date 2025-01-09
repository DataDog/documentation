---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/alias-must-be-unique
- /static_analysis/rules/docker-best-practices/alias-must-be-unique
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Error Prone
  id: docker-best-practices/alias-must-be-unique
  language: Docker
  severity: Warning
  severity_rank: 2
title: FROM aliases must be unique
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/alias-must-be-unique`

**Language:** Docker

**Severity:** Warning

**Category:** Error Prone

## Description
When using multiple images in a Dockerfile, aliases must be unique.

## Non-Compliant Code Examples
```docker
FROM awesomeimage:version as build
RUN stuff
FROM otherawesomeimage:version1 as foobar
RUN plop
FROM otherawesomeimage:version2 as build
RUN more_stuff
```

## Compliant Code Examples
```docker
FROM awesomeimage:version as build
RUN stuff
FROM otherawesomeimage:version as another-alias
RUN more_stuff
```
