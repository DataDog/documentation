---
aliases:
- v5z-8zy-27i
control: '5.7'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Privileged ports are not mapped within containers
type: security_rules
---

## Description

The TCP/IP port numbers below 1024are considered privileged ports. Normal users and processes are not allowed to use them for various security reasons. Docker does, however allow a container port to be mapped to a privileged port.

## Rationale

By default, if the user does not specifically declare a container port to host port mapping, Docker automatically and correctly maps the container port to one available in the `49153`-`65535` range on the host. Docker does, however, allow a container port to be mapped to a privileged port on the host if the user explicitly declares it. This is because containers are executed with `NET_BIND_SERVICE` Linux kernel capability which does not restrict privileged port mapping. The privileged ports receive and transmit various pieces of data which are security sensitive and allowing containers to use them is not in line with good security practice.

## Audit

List all running containers instances and their port mappings by executing this command: `docker ps --quiet | xargs docker inspect --format '{{ .Id }}: Ports={{ .NetworkSettings.Ports }}'` You should then review the list and ensure that container ports are not mapped to host port numbers below `102.4`.

## Remediation

Do not map container ports to privileged host ports when starting a container. You should also ensure that there is no such container to host privileged port mapping declarations in the Dockerfile.

## Impact

None

## Default Value

By default, mapping a container port to a privileged port on the host is allowed.

**Note**: There might be certain cases where you want to map privileged ports, because if you forbid it, then the corresponding application has to run outside of a container.

For example: HTTP and HTTPS load balancers have to bind `80/tcp` and `443/tcp` respectively. Forbidding to map privileged ports effectively forbids from running those in a container, and mandates using an external load balancer. In such cases, those containers instances should be marked as exceptions for this recommendation.

## References

1. https://docs.docker.com/engine/userguide/networking/

## CIS Controls

Version 6

9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system.

Version 7

9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
