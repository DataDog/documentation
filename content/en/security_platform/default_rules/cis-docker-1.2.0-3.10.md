---
aliases:
- mzw-7rd-5uu
control: '3.10'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: TLS CA certificate file permissions are set to 444 or more restrictively
type: security_rules
---

## Description

You should verify that the TLS CA certificate file, the file that is passed along with the `--tlscacert` parameter, has permissions of 444 or is set more restrictively.

## Rationale

The TLS CA certificate file should be protected from any tampering. It is used to authenticate the Docker server based on a given CA certificate. It must therefore have permissions of 444, or more restrictive permissions to ensure that the file cannot be modified by a less privileged user.

## Audit

Verify that the TLS CA certificate file has permissions of `444` or more restrictive, by running: 
```
stat -c %a <path to TLS CA certificate file>
```

## Remediation

Run the following command: `chmod 444 <path to TLS CA certificate file>`

This sets the file permissions on the TLS CA file to 444.

## Impact

None

## Default Value

By default, the permissions for the TLS CA certificate file might not be 444. The default file permissions are governed by the operating system or user specific umask values.

## References

1. https://docs.docker.com/registry/insecure/
2. https://docs.docker.com/engine/security/https/

## CIS Controls

Version 6

14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7

14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.
