---
aliases:
- mat-y72-f6k
control: '5.5'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Sensitive host system directories are not mounted on containers
type: security_rules
---

## Description

You should not allow sensitive host system directories such as those listed below to be mounted as container volumes, especially in read-write mode. `/` `/boot` `/dev` `/etc` `/lib` `/proc` `/sys` `/usr`

## Rationale

If sensitive directories are mounted in read-write mode, it is possible to make changes to files within them. This has obvious security implications and should be avoided.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: Volumes={{ .Mounts }}'` This command returns a list of currently mapped directories and indicates whether they are mounted in read-write mode for each container instance.

## Remediation

Do not mount directories which are security sensitive on the host within containers, especially in read-write mode.

## Impact

None

## Default Value

Docker defaults to using a read-write volume but you can also mount a directory read-only. By default, no sensitive host directories are mounted within containers.

## References

1. https://docs.docker.com/engine/tutorials/dockervolumes/

## CIS Controls

Version 6

14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know
