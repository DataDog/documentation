---
aliases:
- 3wk-jj4-zxc
control: 1.2.1
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: A separate partition for containers has been created
type: security_rules
---

## Description

All Docker containers and their data and metadata are stored in the `/var/lib/docker` directory. By default, `/var/lib/docker` should be mounted under either the `/` or `/var` partitions depending on how the Linux operating system in use is configured.

## Rationale

Docker depends on `/var/lib/docker` as the default directory where all Docker related files, including the images, are stored. This directory could fill up quickly causing both Docker and the host to become unusable. For this reason, you should create a separate partition (logical volume) for storing Docker files.

## Audit

To see the partition details for the `/var/lib/docker` mount point, at the Docker host run:

```
grep '/var/lib/docker\s' /proc/mounts 
```

Alternatively, to see whether the configured root directory is a mount point, run.

```
mountpoint -- "$(docker info -f '{{ .DockerRootDir }}')" 
```

## Remediation

For new installations, you should create a separate partition for the `/var/lib/docker` mount point. For systems that have already been installed, you should use the Logical Volume Manager (LVM) within Linux to create a new partition.

## Impact

None.

## Default Value

By default, `/var/lib/docker` is mounted under the `/` or `/var` partitions dependent on how the OS is configured.

## References

1. [https://www.projectatomic.io/docs/docker-storage-recommendation/][1]

## CIS Controls

Version 6.14 Controlled Access Based on the Need to Know                

[1]: https://www.projectatomic.io/docs/docker-storage-recommendation/
