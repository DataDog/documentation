---
aliases:
- qja-9wz-744
control: '5.26'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Container health is checked at runtime
type: security_rules
---

## Description

If the container image does not have an HEALTHCHECK instruction defined, you should use the `--health-cmd` parameter at container runtime to check container health.

## Rationale

If the container image you are using does not have a pre-defined HEALTHCHECK instruction, use the `--health-cmd` parameter to check container health at runtime. Based on the reported health status, remedial actions can be taken if necessary.

## Audit

Run this command and ensure that all containers are reporting their health status: `docker ps --quiet | xargs docker inspect --format '{{ .Id }}: Health={{ .State.Health.Status }}'`

## Remediation

You should run the container using the `--health-cmd` parameter. For example, `docker run -d --health-cmd='stat /etc/passwd || exit 1' nginx`

## Impact

None

## Default Value

By default, health checks are not carried out at container runtime.

## References

1. https://docs.docker.com/engine/reference/run/#healthcheck

## CIS Controls

Version 6

18 Application Software Security Application Software Security
