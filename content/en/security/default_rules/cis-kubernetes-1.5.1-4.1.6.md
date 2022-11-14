---
aliases:
- u9w-ibn-93s
- /security_monitoring/default_rules/u9w-ibn-93s
- /security_monitoring/default_rules/cis-kubernetes-1.5.1-4.1.6
control: 4.1.6
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
title: The kubelet.conf file is owned by root
type: security_rules
---

## Description

Ensure that the `kubelet.conf` file ownership is set to `root:root`.

## Rationale

The `kubelet.conf` file is the kubeconfig file for the node, and controls various parameters that set the behavior and identity of the worker node. You should set its file ownership to maintain the integrity of the file. The file should be owned by root:root.

## Audit

Run the following command (based on the file location on your system) on the each worker node. For example, `stat -c %U:%G /etc/kubernetes/kubelet.conf`. Verify that the ownership is set to `root:root`.

## Remediation

Run this command (based on the file location on your system) on the each worker node. For example, `chown root:root /etc/kubernetes/kubelet.conf`

## Impact

None

## Default value

By default, `kubelet.conf` file ownership is set to `root:root`.

## References

1. [https://kubernetes.io/docs/admin/kubelet/][1]

## CIS controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/admin/kubelet/
