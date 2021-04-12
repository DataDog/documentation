---
aliases:
- i83-4vy-3gc
control: '5.24'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: cgroup usage is confirmed
type: security_rules
---

## Description

It is possible to attach to a particular `cgroup` when a container is instantiated. Confirming `cgroup` usage would ensure that containers are running in defined `cgroup`s.

## Rationale

System administrators typically define `cgroup`s in which containers are supposed to run. If `cgroup`s are not explicitly defined by the system administrator, containers run in the docker `cgroup` by default. At run time, it is possible to attach a container to a different `cgroup` other than the one originally defined. This usage should be monitored and confirmed, as by attaching to a different `cgroup`, excess permissions and resources might be granted to the container and this can therefore prove to be a security risk.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: CgroupParent={{ .HostConfig.CgroupParent }}'` 

This command returns the cgroup where the containers are running. If it is blank, it means that containers are running under the default docker cgroup. Any other return value indicates that the system is not configured in line with good security practice.

## Remediation

You should not use the `--cgroup-parent` option within the docker run command unless strictly required.

## Impact

None.

## Default Value

By default, containers run under docker `cgroup`.

## References

1. https://docs.docker.com/engine/reference/run/#specify-custom-cgroups
2. https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Resource_Management_Guide/ch01.html

## CIS Controls

Version 6

18 Application Software Security Application Software Security

## Audit

You should run the following command: docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: CgroupParent={{ .HostConfig.CgroupParent }}' The above command returns the cgroup where the containers are running. If it is blank, it means that containers are running under the default docker cgroup. Any other return value indicates that the system is not configured in line with good security practice.
