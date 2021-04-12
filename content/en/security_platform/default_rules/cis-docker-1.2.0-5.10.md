---
aliases:
- kax-jws-8j3
control: '5.10'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Memory usage for containers is limited
type: security_rules
---

## Description

By default, all containers on a Docker host share resources equally. By using the resource management capabilities of the Docker host, you can control the amount of memory that a container is able to use.

## Rationale

By default a container can use all of the memory on the host. You can use memory limit mechanisms to prevent a denial of service occurring where one container consumes all of the hosts resources and other containers on the same host are therefore not able to function. Having no limit on memory usage can lead to issues where one container can easily make the whole system unstable and as a result unusable.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: Memory={{ .HostConfig.Memory }}'` 

If this command returns 0, it means that memory limits are not in place; if it returns a non-zero value, it means that they are in place.

## Remediation

You should run the container with only as much memory as it requires by using the `--memory argument`. For example, you could run a container using the command `docker run --interactive --tty --memory 256m centos /bin/bash`

In this example, the container is started with a memory limit of 256 MB. Note that the output of the command below returns values in scientific notation if memory limits are in place. `docker inspect --format='{{.Config.Memory}}' 7c5a2d4c7fe0`

For example, if the memory limit is set to 256 MB for a container instance, the output of the command above would be `2.68435456e+08` and NOT `256m`. You should convert this value using a scientific calculator.

## Impact

If correct memory limits are not set on each container, one process can expand its usage and cause other containers to run out of resources.

## Default Value

By default, all containers on a Docker host share their resources equally and no memory limits are enforced.

## References

1. https://goldmann.pl/blog/2014/09/11/resource-management-in-docker/
2. https://docs.docker.com/engine/reference/commandline/run/#options
3. https://docs.docker.com/engine/admin/runmetrics/

## CIS Controls

Version 6

18 Application Software Security Application Software Security
