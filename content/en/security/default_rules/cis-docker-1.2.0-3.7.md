---
aliases:
- 3kg-bxt-kah
- /security_monitoring/default_rules/3kg-bxt-kah
- /security_monitoring/default_rules/cis-docker-1.2.0-3.7
control: '3.7'
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
title: Only the root account and group have ownership over the registry certificate
  file
type: security_rules
---

## Description

You should verify that all the registry certificate files, usually found under the `/etc/docker/certs.d/<registry-name>` directory, are individually owned and group owned by root.

## Rationale

The `/etc/docker/certs.d/<registry-name>` directory contains Docker registry certificates. These certificate files must be individually owned and group owned by root to ensure that less privileged users are unable to modify the contents of the directory.

## Audit

You should execute the command below to verify that the registry certificate files are individually owned and group owned by root: 

```
stat -c %U:%G /etc/docker/certs.d/* | grep -v root:root 
```

This command does not return any data.

## Remediation

Execute the following command: `chown root:root /etc/docker/certs.d/<registry-name>/*`

This sets the individual ownership and group ownership for the registry certificate files to root.

## Impact

None

## Default value

By default, the individual ownership and group ownership for registry certificate files is correctly set to root.

## References

1. https://docs.docker.com/registry/insecure/

## CIS controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
