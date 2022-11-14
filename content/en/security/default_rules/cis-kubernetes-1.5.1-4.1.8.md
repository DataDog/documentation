---
aliases:
- qdb-sfn-ny3
- /security_monitoring/default_rules/qdb-sfn-ny3
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-4.1.8
control: 4.1.8
disable_edit: true
framework: cis-kubernetes
integration_id: kubernetes
kind: documentation
rule_category:
- Posture Management (Infra)
- Cloud Security Management
scope: kubernetes
security: compliance
source: kubernetes
title: Client certificate authorities file is owned by root
type: security_rules
---

## Description

Ensure that the certificate authorities file ownership is set to `root:root`.

## Rationale

The certificate authorities file controls the authorities used to validate API requests. You should set its file ownership to maintain the integrity of the file. The file should be owned by `root:root`.

## Audit

Run the following command: `ps -ef | grep kubelet`. Find the file specified by the `--client-ca-file` argument. Run the following command: `stat -c %U:%G <filename>`. Verify that the ownership is set to `root:root`.

## Remediation

Run the following command to modify the ownership of the `--client-ca-file`:

```
chown root:root <filename>
```

## Impact

None

## Default value

By default no `--client-ca-file` is specified.

## References

1. [https://kubernetes.io/docs/admin/authentication/#x509-client-certs][1]

## CIS controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/admin/authentication/#x509-client-certs
