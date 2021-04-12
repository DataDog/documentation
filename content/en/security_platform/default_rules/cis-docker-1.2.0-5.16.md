---
aliases:
- zpv-fua-5jx
control: '5.16'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Host's IPC namespace is not shared
type: security_rules
---

## Description

IPC (POSIX/SysV IPC) namespace provides separation of named shared memory segments, semaphores and message queues. The IPC namespace on the host should therefore not be shared with containers and should remain isolated.

## Rationale

The IPC namespace provides separation of IPC between the host and containers. If the host's IPC namespace is shared with the container, it would allow processes within the container to see all of IPC communications on the host system. This would remove the benefit of IPC level isolation between host and containers. An attacker with access to a container could get access to the host at this level with major consequences. The IPC namespace should therefore not be shared between the host and its containers.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: IpcMode={{ .HostConfig.IpcMode }}'` 

If the command returns `host`, it means that the host IPC namespace is shared with the container. Any other result means that it is not shared, and that the system is configured in line with good security practice.

## Remediation

Do not start a container with the `--ipc=host` argument. For example, do not start a container with the command `docker run --interactive --tty --ipc=host centos /bin/bash`

## Impact

Shared memory segments are used in order to accelerate interprocess communications, commonly in high-performance applications. If this type of application is containerized into multiple containers, you might need to share the IPC namespace of the containers in order to achieve high performance. Under these circumstances, you should still only share container specific IPC namespaces and not the host IPC namespace. A container's IPC namespace can be shared with another container. For example, `docker run --interactive --tty --ipc=container:e3a7a1a97c58 centos /bin/bash`

## Default Value

By default, all containers have their IPC namespace enabled and host IPC namespace is not shared with any container.

## References

1. https://docs.docker.com/engine/reference/run/#ipc-settings-ipc
2. http://man7.org/linux/man-pages/man7/namespaces.7.html

## CIS Controls

Version 6

18 Application Software Security Application Software Security
