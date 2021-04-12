---
aliases:
- kg8-vpu-74c
control: '4.6'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: HEALTHCHECK instructions have been added to container images
type: security_rules
---

## Description

You should add the `HEALTHCHECK` instruction to your Docker container images in order to ensure that health checks are executed against running containers.

## Rationale

An important security control is that of availability. Adding the `HEALTHCHECK` instruction to your container image ensures that the Docker engine periodically checks the running container instances against that instruction to ensure that containers are still operational. Based on the results of the health check, the Docker engine could terminate containers which are not responding correctly, and instantiate new ones.

## Audit

Run this command to ensure that Docker images have the appropriate `HEALTHCHECK` instruction configured: `docker inspect --format='{{ .Config.Healthcheck }}' <IMAGE>`

## Remediation

You should follow the Docker documentation and rebuild your container images to include the `HEALTHCHECK` instruction.

## Impact

None

## Default Value

By default, `HEALTHCHECK` is not set.

## References

1. https://docs.docker.com/engine/reference/builder/#healthcheck

## CIS Controls

Version 6

18 Application Software Security Application Software Security
