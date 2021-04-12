---
aliases:
- 4rp-frf-dq4
control: '3.5'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: /etc/docker directory ownership is set to root:root
type: security_rules
---

## Description

You should verify that the `/etc/docker` directory ownership and group ownership is correctly set to root.

## Rationale

The `/etc/docker` directory contains certificates and keys in addition to various other sensitive files. It should therefore be individual owned and group owned by root in order to ensure that it can not be modified by less privileged users.

## Audit

You should execute the command below to verify that the directory is owned and group owned by root: 

```
stat -c %U:%G /etc/docker | grep -v root:root
``` 

This command does not return any data.

## Remediation

To resolve this issue, run the following command: `chown root:root /etc/docker`

This sets the ownership and group ownership for the directory to root.

## Impact

None

## Default Value

By default, the ownership and group ownership for this directory is correctly set to root.

## References

1. https://docs.docker.com/engine/security/https/

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.`
