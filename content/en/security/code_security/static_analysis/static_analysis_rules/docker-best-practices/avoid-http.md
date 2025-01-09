---
aliases:
- /continuous_integration/static_analysis/rules/docker-best-practices/avoid-http
- /static_analysis/rules/docker-best-practices/avoid-http
dependencies: []
disable_edit: true
group_id: docker-best-practices
meta:
  category: Security
  id: docker-best-practices/avoid-http
  language: Docker
  severity: Warning
  severity_rank: 2
title: Avoid fetching data from HTTP endpoint
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `docker-best-practices/avoid-http`

**Language:** Docker

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Always use `https` links instead of `http`. Do not use clear-text protocols as they lack encryption and authentication.

## Non-Compliant Code Examples
```docker
RUN cd /tmp && wget http://www.scalastyle.org/scalastyle_config.xml && mv scalastyle_config.xml /scalastyle_config.xml
RUN cd /tmp && curl -O http://www.scalastyle.org/scalastyle_config.xml && mv scalastyle_config.xml /scalastyle_config.xml
RUN foobar http://domain.tld
```

## Compliant Code Examples
```docker
RUN cd /tmp && wget https://www.scalastyle.org/scalastyle_config.xml && mv scalastyle_config.xml /scalastyle_config.xml
RUN cd /tmp && curl -O https://www.scalastyle.org/scalastyle_config.xml && mv scalastyle_config.xml /scalastyle_config.xml
RUN cd /tmp && curl -O http://localhost:8080/path
```
