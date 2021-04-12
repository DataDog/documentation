---
aliases:
- 3jt-ywj-82c
control: '2.6'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: TLS authentication for Docker daemon is configured
type: security_rules
---

## Description

It is possible to make the Docker daemon available remotely over a TCP port. If this is required, you should ensure that TLS authentication is configured in order to restrict access to the Docker daemon via IP address and port.

## Rationale

By default, the Docker daemon binds to a non-networked Unix socket and runs with root privileges. If you change the default Docker daemon binding to a TCP port or any other Unix socket, anyone with access to that port or socket could have full access to the Docker daemon and therefore in turn to the host system. For this reason, you should not bind the Docker daemon to another IP/port or a Unix socket. If you must expose the Docker daemon via a network socket, you should configure TLS authentication for the daemon and for any Docker Swarm APIs (if they are in use). This type of configuration restricts the connections to your Docker daemon over the network to a limited number of clients who have access to the TLS client credentials.

## Audit

To confirm that the TLS authentication setting is correct, review the `dockerd` startup options and the settings in `/etc/docker/daemon.json`. To review the `dockerd` startup options, run: 
```
ps -ef | grep dockerd 
```
Confirm that the following parameters are present: `--tlsverify --tlscacert --tlscert --tlskey`.

Also review the `/etc/docker/daemon.json` file to ensure these settings are in place.

## Remediation

Follow the steps mentioned in the Docker documentation or other references.

## Impact

You would need to manage and guard certificates and keys for the Docker daemon and Docker clients.

## Default Value

By default, TLS authentication is not configured.

## References

1. https://docs.docker.com/engine/security/https/

## CIS Controls

Version 6

9.1 Limit Open Ports, Protocols, and Services - Ensure that only ports, protocols, and services with validated business needs are running on each system.

Version 7

9.2 Ensure Only Approved Ports, Protocols and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.
