---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: docker-best-practices/avoid-http
  language: Docker
  severity: Warning
title: Avoid fetching data from HTTP endpoint
---
## Metadata
**ID:** `docker-best-practices/avoid-http`

**Language:** Docker

**Severity:** Warning

**Category:** Security

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
```
