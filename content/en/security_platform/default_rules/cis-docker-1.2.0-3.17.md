---
aliases:
- sc4-qiy-6ni
control: '3.17'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: daemon.json file ownership is set to root:root
type: security_rules
---

## Description

You should verify that the daemon.json file individual ownership and group ownership is correctly set to root.

## Rationale

The daemon.json file contains sensitive parameters that could alter the behavior of the docker daemon. It should therefore be owned and group owned by root to ensure it can not be modified by less privileged users.

## Audit

Verify that the `daemon.json` file is owned and group-owned by root by running: 
```
stat -c %U:%G /etc/docker/daemon.json | grep -v root:root 
```
The command should return no results.

## Remediation

Run `chown root:root /etc/docker/daemon.json`

This sets the ownership and group ownership for the file to root.

## Impact

None

## Default Value

This file may not be present on the system, and in that case, this recommendation is not applicable.

## References

1. https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
