---
aliases:
- bap-wei-4kf
control: '3.11'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Docker server certificate file ownership is set to root:root
type: security_rules
---

## Description

You should verify that the Docker server certificate file, the file that is passed along with the `--tlscert` parameter, is individual owned and group owned by root.

## Rationale

The Docker server certificate file should be protected from any tampering. It is used to authenticate the Docker server based on the given server certificate. It must therefore be individually owned and group owned by root to prevent modification by less privileged users.

## Audit

Verify that the Docker server certificate file is individually owned and group-owned by root, by running: 
```
stat -c %U:%G <path to Docker server certificate file> | grep -v root:root
```
The command should return no results.

## Remediation

Run the following command: `chown root:root <path to Docker server certificate file>`

This sets the individual ownership and the group ownership for the Docker server certificate file to root.

## Impact

None

## Default Value

By default, the ownership and group-ownership for Docker server certificate file is correctly set to root.

## References

1. https://docs.docker.com/registry/insecure/
2. https://docs.docker.com/engine/security/https/

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
