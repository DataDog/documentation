---
aliases:
- q72-h6h-g9s
control: 1.1.20
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Kubernetes PKI certificate file permissions are set to 644 or more restrictive
type: security_rules
---

## Description

Ensure that Kubernetes PKI certificate files have permissions of 644 or more restrictive.

## Rationale

Kubernetes makes use of a number of certificate files as part of the operation of its components. The permissions on these files should be set to 644 or more restrictive to protect their integrity.

## Audit

Run the below command (based on the file location on your system) on the master node.

```bash
find /etc/kubernetes/pki -name "*.crt" | xargs stat -c '%n %a'
```

Verify the permissions are `644` or more restrictive.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chmod -R 644 /etc/kubernetes/pki/*.crt`

## Impact

None

## Default Value

By default, the certificates used by Kubernetes are set to have permissions of 644

## References

1. https://kubernetes.io/docs/admin/kube-apiserver/

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
