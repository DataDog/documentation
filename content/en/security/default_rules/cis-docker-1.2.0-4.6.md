---
aliases:
- kg8-vpu-74c
- /security_monitoring/default_rules/kg8-vpu-74c
- /security_monitoring/default_rules/cis-docker-1.2.0-4.6
control: '4.6'
disable_edit: true
framework: cis-docker
integration_id: docker
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: docker
security: compliance
source: docker
title: Container image includes HealthCheck instructions
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

## Default value

By default, `HEALTHCHECK` is not set.

## References

1. https://docs.docker.com/engine/reference/builder/#healthcheck

## CIS controls

Version 6

18 Application Software Security Application Software Security
