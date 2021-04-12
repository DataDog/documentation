---
aliases:
- n49-94s-88z
control: 1.1.4
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Controller manager pod specification file ownership is set to root:root
type: security_rules
---

## Description

Ensure that the controller manager pod specification file ownership is set to root:root.

## Rationale

The controller manager pod specification file controls various parameters that set the behavior of various components of the master node. You should set its file ownership to maintain the integrity of the file. The file should be owned by root:root.

## Audit

Run the below command (based on the file location on your system) on the master node.

```bash
stat -c %U:%G /etc/kubernetes/manifests/kube-controller-manager.yaml
```

Verify the ownership is set to `root:root`.

## Remediation

Run the below command (based on the file location on your system) on the master node. For example, `chown root:root /etc/kubernetes/manifests/kube-controller-manager.yaml`

## Impact

None

## Default Value

By default, `kube-controller-manager.yaml` file ownership is set to root:root.

## References

1. https://kubernetes.io/docs/admin/kube-controller-manager

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7

5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.
