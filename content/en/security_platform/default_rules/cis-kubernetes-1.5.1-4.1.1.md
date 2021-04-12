---
aliases:
- tcn-3y4-mfh
control: 4.1.1
disable_edit: true
framework: cis-kubernetes
kind: documentation
rule_category:
- Runtime Agent
scope: kubernetes
security: compliance
source: kubernetes
title: Kubelet service file permissions are set to 644 or more restrictive
type: security_rules
---

## Description

Ensure that the kubelet service file has permissions of 644 or more restrictive.

## Rationale

The kubelet service file controls various parameters that set the behavior of the kubelet service in the worker node. You should restrict its file permissions to maintain the integrity of the file. The file should be writable by only the administrators on the system.

## Audit

Run the following command (based on the file location on your system) on the each worker node. For example, `stat -c %a /etc/systemd/system/kubelet.service.d/10-kubeadm.conf`. Verify that the permissions are 644 or more restrictive.

## Remediation

Run the below command (based on the file location on your system) on the each worker node.

For example, `chmod 644 /etc/systemd/system/kubelet.service.d/10-kubeadm.conf`

## Impact

None

## Default Value

By default, the kubelet service file has permissions of 640.

## References

1. [https://kubernetes.io/docs/admin/kubelet/ ][1]
2. [https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#44-joining-your-nodes ][2]
3. [https://kubernetes.io/docs/admin/kubeadm/#kubelet-drop-in][3]

## CIS Controls

Version 6.5.1 Minimize And Sparingly Use Administrative Privileges - Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

Version 7.5.2 Maintain Secure Images - Maintain secure images or templates for all systems in the enterprise based on the organization's approved configuration standards. Any new system deployment or existing system that becomes compromised should be imaged using one of those images or templates.

[1]: https://kubernetes.io/docs/admin/kubelet/
[2]: https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#44-joining-your-nodes
[3]: https://kubernetes.io/docs/admin/kubeadm/#kubelet-drop-in
