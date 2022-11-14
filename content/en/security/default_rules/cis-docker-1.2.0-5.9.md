---
aliases:
- 3s2-7iz-qi8
- /security_monitoring/default_rules/3s2-7iz-qi8
- /security_monitoring/default_rules/cis-docker-1.2.0-5.9
control: '5.9'
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
title: Host's network namespace is not shared with containers
type: security_rules
---

## Description

When the networking mode on a container is set to `--net=host`, the container is not placed inside a separate network stack. Effectively, applying this option instructs Docker to not containerize the container's networking. The consequence of this is that the container lives "outside" in the main Docker host and has full access to its network interfaces.

## Rationale

Selecting this option is potentially dangerous. It allows the container process to open reserved low numbered ports in the way that any other root process can. It also allows the container to access network services such as D-bus on the Docker host. A container process could potentially carry out undesired actions, such as shutting down the Docker host. This option should not be used unless there is a very specific reason for enabling it.

## Audit

Use this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: NetworkMode={{ .HostConfig.NetworkMode }}'` If this returns `NetworkMode=host`, it means that the `--net=host` option was passed when the container was started.

## Remediation

You should not pass the --net=host option when starting any container.

## Impact

None.

## Default value

By default, containers connect to the Docker bridge when starting and do not run in the context of the host's network stack.

## References

1. https://docs.docker.com/engine/userguide/networking/ 2. https://docs.docker.com/engine/reference/run/#network-settings

## CIS controls

Version 6 12 Boundary Defense Boundary Defense
