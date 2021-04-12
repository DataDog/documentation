---
aliases:
- gdz-mkr-i6f
control: '5.20'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Host's UTS namespace is not shared
type: security_rules
---

## Description

UTS namespaces provide isolation between two system identifiers: the hostname and the NIS domain name. It is used to set the hostname and the domain which are visible to running processes in that namespace. Processes running within containers do not typically require to know either the hostname or the domain name. The UTS namespace should therefore not be shared with the host.

## Rationale

Sharing the UTS namespace with the host provides full permission for each container to change the hostname of the host. This is not in line with good security practice and should not be permitted.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: UTSMode={{ .HostConfig.UTSMode }}'` 

If this command returns `host`, it means the host UTS namespace is shared with the container and this recommendation is non-compliant. If the above command returns nothing, then the host's UTS namespace is not shared. This recommendation is then compliant.

## Remediation

You should not start a container with the `--uts=host` argument. For example, do not start a container using the command `docker run --rm --interactive --tty --uts=host rhel7.2`

## Impact

None

## Default Value

By default, all containers have the UTS namespace enabled and the host UTS namespace is not shared with any containers.

## References

1. https://docs.docker.com/engine/reference/run/#uts-settings-uts
2. http://man7.org/linux/man-pages/man7/namespaces.7.html

## CIS Controls

Version 6

18 Application Software Security Application Software Security
