---
aliases:
- ifu-a4v-5aw
control: '3.13'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Docker server certificate key file ownership is set to root:root
type: security_rules
---

## Description

You should verify that the Docker server certificate key file, the file that is passed along with the `--tlskey` parameter, is individually owned and group owned by root.

## Rationale

The Docker server certificate key file should be protected from any tampering or unneeded reads/writes. As it holds the private key for the Docker server certificate, it must be individually owned and group owned by root to ensure that it cannot be accessed by less privileged users.

## Audit

Verify that the Docker server certificate key file is individually owned and group-owned by root, by running: 
```
stat -c %U:%G <path to Docker server certificate key file> | grep -v root:root 
```
The command should return no results.

## Remediation

Run the following command: `chown root:root <path to Docker server certificate key file>`

This sets the individual ownership and group ownership for the Docker server certificate key file to root.

## Impact

None

## Default Value

By default, the individual ownership and group ownership for the Docker server certificate key file is correctly set to root.

## References

1. https://docs.docker.com/registry/insecure/
2. https://docs.docker.com/engine/security/https/

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
