---
aliases:
- 9h8-wne-ybj
control: '5.30'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Host's user namespaces are not shared
type: security_rules
---

## Description

You should not share the host's user namespaces with containers running on it.

## Rationale

User namespaces ensure that a root process inside the container will be mapped to a non-root process outside the container. Sharing the user namespaces of the host with the container does not therefore isolate users on the host from users in the containers.

## Audit

Run this command and ensure that it does not return any value for `UsernsMode`. If it returns a value of `host`, it means that the host user namespace is shared with its containers: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: UsernsMode={{ .HostConfig.UsernsMode }}'`

## Remediation

Do not share user namespaces between host and containers. For example, do not run the command `docker run --rm -it --userns=host ubuntu bash`

## Impact

None

## Default Value

By default, the host user namespace is shared with containers unless user namespace support is enabled.

## References

1. https://docs.docker.com/engine/security/userns-remap/
2. https://docs.docker.com/engine/reference/commandline/run/#options
3. https://github.com/docker/docker/pull/12648
4. https://events.linuxfoundation.org/sites/events/files/slides/User%20Namespaces%20-%20ContainerCon%202015%20-%2016-9-final_0.pdf

## CIS Controls

Version 6

12 Boundary Defense Boundary Defense
