---
aliases:
- j9z-sms-f3m
control: '5.31'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Docker socket is not mounted inside any containers
type: security_rules
---

## Description

The Docker socket docker.sock should not be mounted inside a container.

## Rationale

If the Docker socket is mounted inside a container it could allow processes running within the container to execute Docker commands which would effectively allow for full control of the host.

## Audit

Run this command: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: Volumes={{ .Mounts }}' | grep docker.sock` This returns any instances where `docker.sock` has been mapped to a container as a volume.

## Remediation

You should ensure that no containers mount docker.sock as a volume.

## Impact

None

## Default Value

By default, docker.sock is not mounted inside containers.

## References

1. https://raesene.github.io/blog/2016/03/06/The-Dangers-Of-Docker.sock/
2. https://forums.docker.com/t/docker-in-docker-vs-mounting-var-run-docker-sock/9450/2
3. https://github.com/docker/docker/issues/21109

## CIS Controls

Version 6

9 Limitation and Control of Network Ports, Protocols, and Services
