---
aliases:
- ywu-bzc-zzf
- /security_monitoring/default_rules/ywu-bzc-zzf
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-1.1.19
control: 1.1.19
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
title: Kubernetes PKI directory is owned by root
type: security_rules
---

## Description

Ensure that the Kubernetes PKI directory and file ownership is set to root:root.

## Rationale

Kubernetes makes use of a number of certificates as part of its operation. You should set the ownership of the directory containing the PKI information and all files in that directory to maintain their integrity. The directory and files should be owned by root:root.

## Audit

Run the below command (based on the file location on your system) on the master node.

```bash
ls -laR /etc/kubernetes/pki/
```

Verify the ownership of all files and directories in this hierarchy is set to `root:root`.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chown -R root:root /etc/kubernetes/pki/`

## Impact

None

## Default value

By default, the `/etc/kubernetes/pki/` directory and all of the files and directories contained within it, are set to be owned by the root user.

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.
