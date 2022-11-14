---
aliases:
- a7x-nea-bz9
- /security_monitoring/default_rules/a7x-nea-bz9
- /security_monitoring/default_rules/cis-docker-1.2.0-2.3
control: '2.3'
disable_edit: true
framework: cis-docker
integration_id: docker
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: docker
security: compliance
source: docker
title: Docker is authorized to make firewall configuration changes
type: security_rules
---

## Description

The `iptables` firewall is used to set up, maintain, and inspect the tables of IP packet filter rules within the Linux kernel. The Docker daemon should be allowed to make changes to the `iptables` ruleset.

## Rationale

Docker will not make changes to your system `iptables` rules unless you allow it to do so. If you do allow this, Docker server will automatically make any required changes. You should let Docker make changes to `iptables` automatically in order to avoid networking misconfigurations that could affect the communication between containers and with the outside world. Additionally, this reduces the administrative overhead of updating `iptables` every time you add containers or modify networking options.

## Audit

To confirm that the Docker daemon is allowed to change the `iptables` ruleset, review the `dockerd` startup options and the settings in `/etc/docker/daemon.json`. To review the `dockerd` startup options, run: 
```
ps -ef | grep dockerd 
```
Ensure that the `--iptables` parameter is either not present or not set to `false`. Also review the `/etc/docker/daemon.json` file to check that the `iptables` setting is not set to `false`.

## Remediation

Do not run the Docker daemon with `--iptables=false` parameter. 

## Impact

The Docker daemon service requires `iptables` rules to be enabled before it starts. Any restarts of `iptables` during Docker daemon operation may result in losing Docker-created rules. Adding `iptables-persistent` to your `iptables` install can mitigate.

## Default value

By default, `iptables` is set to true.

## References

1. [https://docs.docker.com/engine/userguide/networking/default_network/container-communication/][1]
2. [https://fralef.me/docker-and-iptables.html][2]

## CIS controls

Version 6.5 Controlled Use of Administration Privileges                

[1]: https://docs.docker.com/engine/userguide/networking/default_network/container-communication/
[2]: https://fralef.me/docker-and-iptables.html
