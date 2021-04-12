---
aliases:
- njz-66i-vae
control: 4.1.7
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Certificate authorities file permissions are set to 644 or more restrictive
type: security_rules
---

## Description

Ensure that the certificate authorities file has permissions of 644 or more restrictive.

## Rationale

The certificate authorities file controls the authorities used to validate API requests. You should restrict its file permissions to maintain the integrity of the file. The file should be writable by only the administrators on the system.

## Audit

Run the following command: `ps -ef | grep kubelet`. Find the file specified by the `--client-ca-file` argument. Run the following command: `stat -c %a <filename>`. Verify that the permissions are 644 or more restrictive.

## Remediation

Run the following command to modify the file permissions of the `--client-ca-file`:

```
chmod 644 <filename>
```

## Impact

None

## Default Value

By default no `--client-ca-file` is specified.

## References

1. [https://kubernetes.io/docs/admin/authentication/#x509-client-certs][1]

## CIS Controls

Version 6 5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.14.4 Protect Information With Access Control Lists - All information stored on systems shall be protected with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

Version 7 14.6 Protect Information through Access Control Lists - Protect all information stored on systems with file system, network share, claims, application, or database specific access control lists. These controls will enforce the principle that only authorized individuals should have access to the information based on their need to access the information as a part of their responsibilities.

[1]: https://kubernetes.io/docs/admin/authentication/#x509-client-certs
