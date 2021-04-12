---
aliases:
- 3we-9j9-qmk
control: '5.3'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Linux kernel capabilities are restricted within containers
type: security_rules
---

## Description

By default, Docker starts containers with a restricted set of Linux kernel capabilities. This means that any process can be granted the required capabilities instead of giving it root access. Using Linux kernel capabilities, processes in general do not need to run as the root user.

## Rationale

Docker supports the addition and removal of capabilities. Remove all capabilities not required for the correct function of the container. Specifically, in the default capability set provided by Docker, the NET_RAW capability should be removed if not explicitly required, as it can give an attacker with access to a container the ability to create spoofed network traffic.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: CapAdd={{ .HostConfig.CapAdd }} CapDrop={{ .HostConfig.CapDrop }}'` 

Verify that the added and deleted Linux kernel capabilities are in line with the ones needed by the container process in each container instance. Specifically, ensure that the `NET_RAW` capability is removed if not required.

## Remediation

Execute the command `docker run --cap-add={"Capability 1","Capability 2"} <Run arguments> <Container Image Name or ID> <Command>` to add required capabilities.

Execute the command `docker run --cap-drop={"Capability 1","Capability 2"} <Run arguments> <Container Image Name or ID> <Command>` to remove unneeded capabilities.

Alternatively, remove all the currently configured capabilities and then restore only the ones you specifically use: `docker run --cap-drop=all --cap-add={"Capability 1","Capability 2"} <Run arguments> <Container Image Name or ID> <Command>`

## Impact

Restrictions on processes within a container are based on which Linux capabilities are in force. Removal of the `NET_RAW` capability prevents the container from creating raw sockets which is good security practice under most circumstances, but may affect some networking utilities.

## Default Value

By default, the capabilities below are applied to containers:

* `AUDIT_WRITE`
* `CHOWN`
* `DAC_OVERRIDE`
* `FOWNER`
* `FSETID`
* `KILL`
* `MKNOD`
* `NET_BIND_SERVICE`
* `NET_RAW`
* `SETFCAP`
* `SETGID`
* `SETPCAP`
* `SETUID`
* `SYS_CHROOT`

## References

1. https://docs.docker.com/engine/security/security/#linux-kernel-capabilities
2. http://man7.org/linux/man-pages/man7/capabilities.7.html
3. http://www.oreilly.com/webops-perf/free/files/docker-security.pdf

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
