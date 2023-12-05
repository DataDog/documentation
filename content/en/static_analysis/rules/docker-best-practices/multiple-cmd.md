---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: docker-best-practices/multiple-cmd
  language: Docker
  severity: Notice
title: Do not use multiple CMD
---
## Metadata
**ID:** `docker-best-practices/multiple-cmd`

**Language:** Docker

**Severity:** Notice

**Category:** Best Practices

## Description
Do not use multiple `CMD` instructions, only the last one is used.

## Non-Compliant Code Examples
```docker
FROM awesomeimage
CMD run_server1
CMD run_server2
```

## Compliant Code Examples
```docker
FROM awesomeimage
CMD run_server
```
