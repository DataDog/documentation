---
aliases:
- c9n-kkx-t3p
control: '5.15'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Host's process namespace is not shared
type: security_rules
---

## Description

The Process ID (PID) namespace isolates the process ID space, meaning that processes in different PID namespaces can have the same PID. This creates process level isolation between the containers and the host.

## Rationale

PID namespace provides separation between processes. It prevents system processes from being visible, and allows process ids to be reused including PID 1. If the host's PID namespace is shared with containers, it would basically allow these to see all of the processes on the host system. This reduces the benefit of process level isolation between the host and the containers. Under these circumstances a malicious user who has access to a container could get access to processes on the host itself, manipulate them, and even be able to kill them. This could allow for the host itself being shut down, which could be extremely serious, particularly in a multi-tenanted environment. You should not share the host's process namespace with the containers running on it.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: PidMode={{ .HostConfig.PidMode }}'` 

If the command returns `host`, it means that the host PID namespace is shared with its containers; any other result means that the system is configured in line with good security practice.

## Remediation

You should not start a container with the `--pid=host` argument. For example, do not start a container with the command: `docker run --interactive --tty --pid=host centos /bin/bash`

## Impact

Container processes cannot see processes on the host system. In certain circumstances, you may want your container to share the host's process namespace. For example, you could build a container containing debugging tools such as strace or gdb, and want to use these tools when debugging processes on the host. If this is desired, then share specific host processes using the `-p` switch. For example: `docker run --pid=host rhel7 strace -p 1234`

## Default Value

By default, all containers have the PID namespace enabled and the therefore the host's process namespace is not shared with its containers.

## References

1. https://docs.docker.com/engine/reference/run/#pid-settings-pid 2. http://man7.org/linux/man-pages/man7/pid_namespaces.7.html

## CIS Controls

Version 6

18 Application Software Security Application Software Security
