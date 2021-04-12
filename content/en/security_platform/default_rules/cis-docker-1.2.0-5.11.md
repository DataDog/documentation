---
aliases:
- wys-u76-jdp
control: '5.11'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: CPU priority is set appropriately on containers
type: security_rules
---

## Description

By default, all containers on a Docker host share resources equally. By using the resource management capabilities of the Docker host you can control the host CPU resources that a container may consume.

## Rationale

By default, CPU time is divided between containers equally. If you wish to control available CPU resources amongst container instances, you can use the CPU sharing feature. CPU sharing allows you to prioritize one container over others and prevents lower priority containers from absorbing CPU resources which may be required by other processes. This ensures that high priority containers are able to claim the CPU runtime they require.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: CpuShares={{ .HostConfig.CpuShares }}'` 

If this command returns 0 or 1024, it means that CPU shares are not in place. If it returns a non-zero value other than 1024, it means that they are in place.

## Remediation

You should manage the CPU runtime between your containers dependent on their priority within your organization. To do so, start the container using the `--cpu-shares` argument. For example, you could run a container as `docker run --interactive --tty --cpu-shares 512 centos /bin/bash` The container is started with CPU shares of 50% of what other containers use. So if the other container has CPU shares of 80%, this container will have CPU shares of 40%. Every new container will have 1024 shares of CPU by default. However, this value is shown as 0 if you run the command mentioned in the audit section.


Alternatively:

1. Navigate to the `/sys/fs/cgroup/cpu/system.slice/` directory.
2. Check your container instance ID using docker ps.
3. Inside the above directory (in step 1), call a directory. For example: `docker-<Instance ID>.scope` or `docker-4acae729e8659c6be696ee35b2237cc1fe4edd2672e9186434c5116e1a6fbed6.scope`. Navigate to this directory.
4. You will find a file named `cpu.shares`. Execute `cat cpu.shares`. This will always give you the CPU share value based on the system. Even if there are no CPU shares configured using the `-c` or `--cpu-shares` argument in the docker run command, this file will have a value of 1024. If you set one containers CPU shares to 512 it will receive half of the CPU time compared to the other containers. So if you take 1024 as 100% you can then derive the number that you should set for respective CPU shares. For example, use 512 if you want to set it to 50% and 256 if you want to set it 25%.

## Impact

If you do not correctly assign CPU thresholds, the container process may run out of resources and become unresponsive. If CPU resources on the host are not constrained, CPU shares do not place any restrictions on individual resources.

## Default Value

By default, all containers on a Docker host share their resources equally. No CPU shares are enforced.

## References

1. https://goldmann.pl/blog/2014/09/11/resource-management-in-docker/
2. https://docs.docker.com/engine/reference/commandline/run/#options
3. https://docs.docker.com/engine/admin/runmetrics/

## CIS Controls

Version 6

18 Application Software Security Application Software Security
